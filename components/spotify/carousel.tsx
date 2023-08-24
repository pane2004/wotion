import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Spacer,
  Text,
  Skeleton,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { SPOTIFY_LOGO, VINYL_RECORD } from "@/constants/constants";
import { SpotifyConfig } from "@/types/types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SpotifyCarousel({
  config,
  urls,
}: {
  config: SpotifyConfig | undefined;
  urls: string[] | undefined;
}) {
  const [urlResponses, setUrlResponses] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const bg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (urls) {
      let urlsCopy = urls;
      if (config?.shuffle) {
        // inefficient but should suffice since spotify lists are small
        urlsCopy = urls
          .map((url) => ({ url, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ url }) => url);
      }

      const fetchData = async () => {
        setIsLoading(true);
        try {
          const responsePromises = urlsCopy.map(async (url) => {
            if (!url) return null;
            const parsedParam = encodeURIComponent(url);
            const res = await fetch(`/api/widgets/spotify/${parsedParam}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.ok) {
              const data = await res.json();
              setError(false);
              return { ...data, url: url };
            } else {
              throw new Error(
                `Error for ${url}. Response Status: ${res.status}`
              );
            }
          });

          const responses = await Promise.all(responsePromises);
          setUrlResponses(responses.filter((res) => res));
        } catch (error) {
          setError(true);
          setUrlResponses([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [config?.shuffle, urls]);

  // Loading state
  if (isLoading) {
    return (
      <Box minW="30vh" p={5} bg={bg} borderRadius="lg">
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
        <Skeleton height="40px" my="10px" />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box>
        Error retrieving Spotify data <br />
        <br />
        Make sure the urls in your widget follows the format! (and exists 😉)
      </Box>
    );
  }

  return (
    <Box
      w={"100%"}
      h={"100%"}
      borderRadius={10}
      position="relative"
    >
      {config?.record && (
        <VINYL_RECORD
          style={{
            position: "absolute",
            left: "40%",
            bottom: "10%",
            animation: "spin 8s linear infinite",
            zIndex: -1,
            width: "80%",
            height: "80%",
            overflow: "hidden",
          }}
        />
      )}
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        emulateTouch={true}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={false}
        autoPlay={config?.auto}
        stopOnHover={true}
        interval={6000}
        transitionTime={1000}
      >
        {urlResponses &&
          urlResponses.map((url: any) => (
            <Box
              key={url.html}
              p={5}
              position="relative"
              _hover={{
                ".overlay-text": { opacity: 1 },
              }}
            >
              <Link
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
                w="full"
              >
                <Box position="relative" borderRadius={10} overflow="hidden">
                  <Image
                    objectFit="cover"
                    src={url?.thumbnail_url}
                    alt={url?.title}
                  />
                  <Box
                    className="overlay-text"
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    opacity={0}
                    transition="opacity 0.5s"
                    color="white"
                    bg="rgba(0, 0, 0, 0.3)"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="flex-end"
                    flexDir={"column"}
                  >
                    {config?.logo && (
                      <Box
                        w="10%"
                        h="10%"
                        position="absolute"
                        top="5%"
                        left="85%"
                      >
                        <SPOTIFY_LOGO />
                      </Box>
                    )}
                    <Heading textAlign={"left"} pl={5} pb={5} size={"lg"}>
                      {url?.title}
                    </Heading>
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
      </Carousel>
    </Box>
  );
}
