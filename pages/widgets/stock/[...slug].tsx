import { StockConfig } from "@/types/types";
import { useRouter } from "next/router";
import { Flex, VStack, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { STOCK_INTERVALS } from "@/constants/constants";
import StockCard from "@/components/stock/stockcard";

const isStockConfig = (obj: any): obj is StockConfig => {
  // Check if obj is an object
  if (typeof obj !== "object" || obj === null) return false;

  // Check required fields
  if (
    typeof obj.id !== "string" ||
    typeof obj.stock !== "string" ||
    !STOCK_INTERVALS.includes(obj.interval) ||
    typeof obj.showVolume !== "boolean" ||
    typeof obj.showOpen !== "boolean" ||
    typeof obj.showClose !== "boolean" ||
    typeof obj.showHigh !== "boolean" ||
    typeof obj.showLow !== "boolean"
  )
    return false;

  // If all checks passed, return true
  return true;
};

export default function StockWidget() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [configs, setConfigs] = useState<StockConfig[]>();

  useEffect(() => {
    let slugs = router.query.slug;
    if (typeof slugs === "string") {
      slugs = [slugs];
    }
    if (slugs) {
      const formattedConfigs: StockConfig[] = slugs.map((str) => {
        const pairs = str.split("&&");
        const id =
          Date.now().toString(36) + Math.random().toString(36).substring(2);
        let obj: any = { id };
        pairs.forEach((pair) => {
          const components = pair.split("=");
          // split by = means key value, otherwise its a bool
          if (components.length > 1) {
            obj[components[0]] = components[1];
          } else if (pair[0] === "!") {
            obj[pair.slice(1)] = false;
          } else {
            obj[pair] = true;
          }
        });
        if (isStockConfig(obj)) {
          return obj;
        }
        setError(true);
        return obj;
      });
      setConfigs(formattedConfigs);
    }
  }, [router.query.slug]);

  return (
    <Box height="100vh" width="100vw">
      {error ? (
        <Text>Failed to render.</Text>
      ) : (
        <Flex
          gap={5}
          width={"100%"}
          height={"100%"}
          direction={"column"}
        >
          {configs &&
            configs.length > 0 &&
            configs.map((widget, i) => (
              <StockCard key={`${widget.id}-${i}`} config={widget} />
            ))}
        </Flex>
      )}
    </Box>
  );
}
