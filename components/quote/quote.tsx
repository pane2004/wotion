import { Box, Heading } from "@chakra-ui/react";
import { FaQuoteLeft } from "react-icons/fa";

export default function QuoteWidget({
  quote,
  speaker,
}: {
  quote: string;
  speaker: string;
}) {
  return (
    <Box p={5}>
      <Box maxW={300}>
        <Heading>
          <FaQuoteLeft />
          {quote}
        </Heading>
        <Heading fontWeight={"normal"} size={"lg"}>
          -{speaker}
        </Heading>
      </Box>
    </Box>
  );
}
