import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaUser,
} from "react-icons/fa";
import { ReactNode } from "react";
import { useRouter } from "next/router";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const router = useRouter();

  return (
    <Box
      bg={useColorModeValue("brand.bg", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2023 All rights reserved. Made with ❤️ by Alex Lu.</Text>
        <Stack direction={"row"} spacing={6} align={"center"}>
          <Text
            onClick={() => {
              router.push("/disclaimers");
            }}
            cursor={"pointer"}
            fontSize={"sm"}
            as={'u'}
          >
            Disclaimers
          </Text>
          <SocialButton label={"Github"} href={"https://github.com/pane2004"}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={"Website"} href={"https://alexlu.ca"}>
            <FaUser />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
