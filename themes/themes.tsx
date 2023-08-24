import { switchAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    _checked: {
      bg: "brand.light",
    },
  },
});

const CopyButton = defineStyle({
  background: "brand.light",
  color: "white",
  _hover: {
    background: "brand.main",
  },
  _dark: {
    background: "brand.light",
    color: "white",
    _hover: {
      background: "brand.main",
    },
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { CopyButton },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
  />
);
