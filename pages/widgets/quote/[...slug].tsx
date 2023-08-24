import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text } from "@chakra-ui/react";
import QuoteWidget from "@/components/quote/quote";

const parseSlug = (slugs: string[]) => {
  let configuration: any = {};

  slugs.forEach((slug) => {
    const params = slug.split("&&");

    params.forEach((param) => {
      const [key, value] = param.split("=");

      switch (key) {
        case "quote":
          configuration.quote = decodeURIComponent(value);
          break;
        case "speaker":
          configuration.speaker = decodeURIComponent(value);
          break;
        default:
          break;
      }
    });
  });
  return configuration;
};

export default function ButtonWidgetOutput() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [configuration, setConfiguration] = useState<any>();

  useEffect(() => {
    let slugs = router.query.slug;

    if (typeof slugs === "string") {
      slugs = [slugs];
    }
    if (slugs) {
      setConfiguration(parseSlug(slugs));
    }
  }, [router.query.slug]);

  return (
    <Box height="100vh" width="100vw">
      {error ? (
        <Text>Failed to render.</Text>
      ) : (
        <Flex
          width={"100%"}
          height={"100%"}
          p={5}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {configuration && (
            <QuoteWidget
              quote={configuration.quote}
              speaker={configuration.speaker}
            />
          )}
        </Flex>
      )}
    </Box>
  );
}
