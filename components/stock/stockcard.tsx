import { useState, useEffect } from "react";

import { Box, Heading, Spacer, Text, Skeleton, useColorModeValue } from "@chakra-ui/react";

import { StockConfig, StockData } from "@/types/types";

function formatTimeStamp(timeStamp: number) {
  const date = new Date(timeStamp * 1000);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function StockCard({ config }: { config: StockConfig }) {
  const [data, setData] = useState<StockData>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bg = useColorModeValue("gray.100", "gray.700");

  // fetch stock data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/widgets/stock/${config.stock}/${config.interval}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data: StockData = await res.json();
          setData(data);
        } else {
          console.error("Response Status:", res.status);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [config]);

  // Loading state
  if (isLoading) {
    return (
      <Box minW="30vh" p={5} bg={bg} borderRadius="lg">
        <Skeleton height="30px" my="10px" />
        <Skeleton height="30px" my="10px" />
        <Skeleton height="30px" my="10px" />
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      bg={bg}
      alignItems="flex-start"
      borderRadius="lg"
      p={5}
      width={"100%"}
    >
      <Box display="flex" alignContent="start" alignItems={"flex-end"}>
        <Heading size="lg">{data.symbol}</Heading>
        <Text mb={1} ml={2} fontSize={"sm"}>{`(${data.exchange})`}</Text>
      </Box>
      <Box display="flex" alignItems="center" width="100%">
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Heading size="xl">${data.currentPrice}</Heading>
          <Text color="grey" size="md">
            {data.timeZone}
          </Text>
        </Box>
        <Spacer />
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Heading
            size="xl"
            color={data.change >= 0 ? "green" : "red"}
            fontWeight={"normal"}
          >
            {data.percentChange}%
          </Heading>
          <Text color="grey" fontSize="md" textAlign="right">
            {formatTimeStamp(data.timestamp)}
          </Text>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        gap={3}
      >
        {(config.showOpen || config.showClose) && (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            {config.showOpen && (
              <Text>
                <b>Open: </b>
                {data.open}
              </Text>
            )}
            {config.showClose && (
              <Text>
                <b>Close: </b>
                {data.close}
              </Text>
            )}
          </Box>
        )}
        {(config.showHigh || config.showLow) && (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            {config.showHigh && (
              <Text>
                <b>High: </b>
                {data.high}
              </Text>
            )}
            {config.showLow && (
              <Text>
                <b>Low: </b>
                {data.low}
              </Text>
            )}
          </Box>
        )}
        {config.showVolume && (
          <Text>
            <b>Volume: </b>
            {data.volume}
          </Text>
        )}
      </Box>
    </Box>
  );
}
