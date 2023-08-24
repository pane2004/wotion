import { Box, Flex, Button, Stack, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <>
      <Box px={4} pt={5}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Image
            height={75}
            width={75}
            src={logo}
            alt="wotion logo"
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          />
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <a href="https://github.com/pane2004/motionverse" target="_blank">
                <Button rightIcon={<FaGithub />}>View on Github</Button>
              </a>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
