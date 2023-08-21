import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  createIcon,
} from "@chakra-ui/react";

export default function WidgetDisplay() {
  return (
    <>
      <Stack as={Box} textAlign={"center"} py={20} bg={"brand.bg"}>
        <Heading
          fontWeight={600}
          fontSize={{ md: "4xl", sm: "6xl" }}
          lineHeight={"130%"}
          color={"brand.main"}
        >
          Browse the Motionverse
        </Heading>
      </Stack>
    </>
  );
}
