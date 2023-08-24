import { SpotifyConfig, StockConfig } from "@/types/types";
import { useRouter } from "next/router";
import { Flex, VStack, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { STOCK_INTERVALS } from "@/constants/constants";
import StockCard from "@/components/stock/stockcard";
import SpotifyCarousel from "@/components/spotify/carousel";

export default function SpotifyWidget() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [config, setConfig] = useState<SpotifyConfig>();
  const [urls, setUrls] = useState<string[]>();
  
  useEffect(() => {
    const slug = router.query.slug;
    if (slug && Array.isArray(slug)) {
      setConfig({
        record: slug[0] === "record" ? true : false,
        shuffle: slug[1] === "shuffle" ? true : false,
        auto: slug[2] === "auto" ? true : false,
        logo: slug[3] === "logo" ? true : false,
      }); 
      setUrls(slug.slice(4).map(url => decodeURI(url)));
    }
  }, [router.query.slug]);

  return (
    <Box height="100vh" width="100vw">
      {error ? (
        <Text>Failed to render.</Text>
      ) : (
          <SpotifyCarousel
            config={config}
            urls={urls}
          />
      )}
    </Box>
  );
}