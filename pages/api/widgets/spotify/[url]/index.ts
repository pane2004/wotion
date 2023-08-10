import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { StockData } from "@/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  try {
    const axiosRes = await axios.get(
      `https://open.spotify.com/oembed?url=${url}`
    );
    const data = axiosRes.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "There was an error fetching data from Spotify API",
    });
  }
}