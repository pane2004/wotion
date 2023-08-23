import {
  Container,
  Divider,
} from "@chakra-ui/react";
import HeroLanding from "./hero";
import WidgetDisplay from "./display";
import NavHead from "./header";
import Footer from "./footer";
import Features from "./features";

export default function LandingPage() {
  return (
    <>
      <Container maxW={"6xl"}>
        <NavHead />
        <HeroLanding />
      </Container>
      <Divider />
      <WidgetDisplay />
      <Divider />
      <Features />
      <Divider />
      <Footer />
    </>
  );
}
