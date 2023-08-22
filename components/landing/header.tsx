import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <a
                href="https://github.com/pane2004/motionverse"
                target="_blank"
              >
                <Button rightIcon={<FaGithub />}>View on Github</Button>
              </a>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
