import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { MediumData } from "@/types/types";
import xml2js from "xml2js";

function formatData(data: any) {
  return {
    author: data.author ? data.author : data.items[0].author,
    authorImg: data.image,
    articles: data.items.map((item: any) => {
      // If "content:encoded" exists, move its content to "description"
      if (item["content:encoded"]) {
        item.description = item["content:encoded"];
        delete item["content:encoded"];
      }
      for (let key in item) {
        if (typeof item[key] === "string") {
          item[key] = item[key].replace(/<p>/g, '<p style="margin: 1em 0;">');
        }
      }
      return item;
    }),
  };
}

async function fetchRssFeed(url: string) {
  try {
    // Fetch the RSS feed
    const response = await axios.get(url);
    const data = response.data;

    // Parse the XML content of the feed
    const parser = new xml2js.Parser({
      trim: true,
      explicitArray: false,
      normalize: true,
    });
    const result = await parser.parseStringPromise(data);

    // Extract desired properties
    const channel = result.rss.channel;

    const output = {
      title: channel.title,
      link: channel.link,
      author: channel.author || channel["dc:creator"] || "",
      description: channel.description,
      image: channel.image?.url || "",
      items: channel.item,
    };

    return output;
  } catch (error) {
    console.error(
      "There was an error fetching or parsing the RSS feed."
    );
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { params } = req.query;
  const format = params && params[0];
  const target = params && params[1];

  try {
    let jsonRes = null;
    switch (format) {
      case "User":
        jsonRes = await fetchRssFeed(`https://medium.com/feed/@${target}`);
        break;
      case "Publication":
        jsonRes = await fetchRssFeed(`https://medium.com/feed/${target}`);
        break;
      case "Tag":
        jsonRes = await fetchRssFeed(`https://medium.com/feed/tag/${target}`);
        break;
      // custom domain, we are just gonna default to this
      case "Custom":
        if (/^medium\..+$/i.test(target ?? "")) {
          jsonRes = await fetchRssFeed(`https://${target}/feed`);
        } else {
          return res.status(400).json({
            error: "Invalid custom domain, must be a medium subdomain.",
          });
        }
        break;
      default:
        return res.status(400).json({ error: "Invalid format parameter." });
    }

    if (!jsonRes) {
      return res.status(404).json({
        error:
          "Failed to fetch or parse the RSS feed from the provided source.",
      });
    }

    res.status(200).json(formatData(jsonRes) as MediumData);
  } catch (error) {
    res.status(500).json({
      error: "There was an error fetching data from Medium Source",
    });
  }
}
