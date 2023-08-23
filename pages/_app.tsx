import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { GridItemStyle } from "@/components/landing/display";
import { extendTheme } from "@chakra-ui/react";
import { switchTheme } from "@/themes/themes";

const theme = extendTheme({
  colors: {
    // 200-600 is for gradient
    brand: {
      main: "#3F3E5E",
      light: "#706D91",
      bg: "#F9F7FF",
      highlight: "#8186F1",
      contrast: "#00C893",
      200: "#7F527B",
      300: "#C16781",
      400: "#F38975",
      500: "#FFBC66",
      600: "#F9F871",
    },
    button: {
      500: "#706D91",
      600: "#3F3E5E",
    },
  },
  components: {
    Switch: switchTheme
  },
  fonts: {
    body: "sans-serif",
    heading: "sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GridItemStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
