import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Divider,
} from "@chakra-ui/react";
import HeroLanding from "./hero";
import WidgetDisplay from "./display";

export default function LandingPage() {
  return (
    <>
      <Container maxW={"5xl"}>
        <HeroLanding />
        <Divider />
      </Container>
      <WidgetDisplay />
    </>
  );
}
