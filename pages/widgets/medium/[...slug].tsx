import { useEffect, useState } from "react";
import { StockConfig } from "@/types/types";
import { useRouter } from "next/router";
import { Flex, VStack, Box, Text } from "@chakra-ui/react";
import MediumNewspaper from "@/components/medium/newspaper";

const parseSlug = (slug: string[]) => {
  let result: any = {};

  // Split by "&&"
  const pairs = slug[0].split("&&");

  pairs.forEach((pair: any) => {
    // Split each pair by "=" to get key and value
    const [key, value] = pair.split("=");

    if (key === "w" || key === "h") {
      // Initialize config object if it doesn't exist
      if (!result?.config) result.config = {};

      // Assign width and height accordingly
      if (key === "w") result.config.width = parseInt(value);
      if (key === "h") result.config.height = parseInt(value);
    } else {
      result[key] = value;
    }
  });

  return result;
};

export default function MediumWidget() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [configuration, setConfiguration] = useState<any>();
  console.log(configuration);
  useEffect(() => {
    let slugs = router.query.slug;
    if (typeof slugs === "string") {
      slugs = [slugs];
    }
    if (slugs) {
      setConfiguration(parseSlug(slugs));
    }
    console.log(slugs);
  }, [router.query.slug]);

  return (
    <Box height="100vh" width="100vw">
      {error ? (
        <Text>L bozo</Text>
      ) : (
        <Flex width={"100%"} height={"100%"} p={5}>
          <MediumNewspaper
            target={configuration?.target}
            format={configuration?.format}
            config={configuration?.config}
          />
        </Flex>
      )}
    </Box>
  );
}
