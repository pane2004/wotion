import { BG_BLUR_IMAGE, WIDGET_DISPLAY_SCHEMA } from "@/constants/constants";
import { WidgetDisplay } from "@/types/types";
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import Image from "next/image";

export default function WidgetDisplayComponent() {
  return (
    <>
      <Stack
        id="browse-anchor"
        as={Box}
        textAlign={"center"}
        py={20}
        bg={useColorModeValue("brand.bg", "gray.900")}
        alignItems={"center"}
      >
        <Heading
          fontWeight={600}
          fontSize={{ md: "4xl", sm: "6xl" }}
          lineHeight={"130%"}
          color={useColorModeValue("brand.main", "brand.bg")}
          pb={20}
        >
          Browse the Wotion Library
        </Heading>
        <Wrap spacing={20} justify={"center"} maxW={"6xl"}>
          {WIDGET_DISPLAY_SCHEMA.map((widget: WidgetDisplay) => (
            <WrapItem key={widget.id}>
              <Product widget={widget} />
            </WrapItem>
          ))}
        </Wrap>
        <Heading
          pt={10}
          fontWeight={500}
          fontSize={{ md: "2xl", sm: "6xl" }}
          lineHeight={"130%"}
          color={useColorModeValue("brand.main", "brand.bg")}
        >
          More Coming Soon...
        </Heading>
      </Stack>
    </>
  );
}

const Product = ({ widget }: { widget: WidgetDisplay }) => {
  const router = useRouter();

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("brand.bg", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        onClick={() => {
          router.push(widget.path);
        }}
        cursor={"pointer"}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${BG_BLUR_IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            className="grid-item-thumbnail"
            height={230}
            width={282}
            src={widget.img}
            alt="#"
          />
        </Box>
        <Stack pt={20} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={600}>
            {widget.title}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"}>
            {widget.description}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};
