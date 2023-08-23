import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  track: {
    _checked: {
      bg: 'brand.light',
    },
  },
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })