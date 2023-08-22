import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { GridItemStyle } from "@/components/landing/display";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GridItemStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
