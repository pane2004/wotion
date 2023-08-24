import { useState, useEffect } from "react";
import { Box, Heading, Spacer, Text, Skeleton, Image, useColorModeValue } from "@chakra-ui/react";
import { MEDIUM_LOGO } from "@/constants/constants";
import { MediumData, MediumFormat, MediumPaperConfig } from "@/types/types";
import HTMLFlipBook from "react-pageflip";
// disable typing for flipbook
const AnyFlipBook: any = HTMLFlipBook;

export default function MediumNewspaper({
  target,
  format,
  config,
}: {
  target: string | undefined;
  format: MediumFormat | undefined;
  config: MediumPaperConfig;
}) {
  const [data, setData] = useState<MediumData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const bg = useColorModeValue("gray.100", "gray.700");

  // fetch data on target or format change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/widgets/medium/${format}/${target}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data: MediumData = await res.json();
          setData(data);
          setError(false);
        } else {
          if (target !== "") setError(true);
          setData(undefined);
          console.error("Response Status:", res.status);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [target, format]);

  // Loading state
  if (isLoading) {
    return (
      <Box minW="30vh" p={5} bg={bg} borderRadius="lg">
        <Skeleton height="50px" my="10px" />
        <Skeleton height="50px" my="10px" />
        <Skeleton height="50px" my="10px" />
        <Skeleton height="50px" my="10px" />
        <Skeleton height="50px" my="10px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        Error retrieving Medium Articles. <br />
        <br />
        Make sure it follows the specified format! (and exists 😉)
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box
      w="100%"
      h="100%"
      p={10}
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <AnyFlipBook
        width={config.width}
        height={config.height}
        maxShadowOpacity={0.3}
        drawShadow={true}
        usePortrait={true}
      >
        <div key={target}>
          <Box
            p={5}
            bg={bg}
            borderRadius="lg"
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            flexDirection="column"
            minW={config.width}
            minH={config.height}
            gap={10}
            borderColor={"grey.200"}
            borderWidth={1}
          >
            {format === "User" && (
              <Image
                borderRadius="full"
                boxSize="150px"
                src={data.authorImg}
                alt={`${data.author}`}
              />
            )}
            <Heading size="md">
              {format === "User" ? data.author : `${format}`}
            </Heading>
            <MEDIUM_LOGO />
          </Box>
        </div>
        {data &&
          data.articles.map((article: any, i: number) => (
            <div key={`${article.title}-${i}`}>
              <Box
                p={5}
                bg={bg}
                borderRadius="lg"
                style={{ maxHeight: "100%", overflowY: "scroll" }}
                minW={config.width}
                minH={config.height}
                borderColor={"grey.200"}
                borderWidth={1}
              >
                <Box
                  dangerouslySetInnerHTML={{ __html: article.title }}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                    overflowX: "clip",
                  }}
                  pl={5}
                  pr={5}
                />
                <Box
                  dangerouslySetInnerHTML={{ __html: article.description }}
                  pl={5}
                  pr={5}
                />
              </Box>
            </div>
          ))}
      </AnyFlipBook>
    </Box>
  );
}
