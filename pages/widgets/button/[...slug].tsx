import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text } from "@chakra-ui/react";
import ButtonWidget from "@/components/button/buttonWidget";

const parseSlug = (slugs: string[]) => {
  let configuration: any = {};

  slugs.forEach((slug) => {
    const params = slug.split("&&");

    params.forEach((param) => {
      const [key, value] = param.split("=");

      switch (key) {
        case "link":
          configuration.link = decodeURIComponent(value);
          break;
        case "m":
          configuration.message = decodeURIComponent(value);
          break;
        case "r":
          configuration.config = {
            ...configuration.config,
            radius: parseInt(value, 10),
          };
          break;
        case "p":
          configuration.config = {
            ...configuration.config,
            padding: parseInt(value, 10),
          };
          break;
        case "pos":
          configuration.config = { ...configuration.config, pos: value };
          break;
        case "icon":
          configuration.icon = value;
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
    console.log(slugs);
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
            <ButtonWidget
              link={configuration.link}
              icon={configuration.icon}
              message={configuration.message}
              config={configuration.config}
            />
          )}
        </Flex>
      )}
    </Box>
  );
}
