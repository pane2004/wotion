import { useEffect, useState, useMemo } from "react";

import {
  Flex,
  Box,
  Heading,
  Button,
  Spacer,
  IconButton,
  Text,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  CopyIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  BUTTON_ICON_POS_OPTIONS,
} from "@/constants/constants";
import { ButtonConfig } from "@/types/types";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/logo.png";

import dynamic from "next/dynamic";
import ButtonWidget from "@/components/button/buttonWidget";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export default function ButtonBuilder() {
  const router = useRouter();
  const [link, setLink] = useState<string>("wotion.co");
  const [message, setMessage] = useState<string>("A Button");
  const [icon, setIcon] = useState<string>("1f607");
  const [config, setConfig] = useState<ButtonConfig>({
    radius: 8,
    padding: 8,
    pos: "none",
  });

  const linkString = useMemo(() => {
    const encodedMessage = encodeURIComponent(message);
    const encodedLink = encodeURIComponent(link);
    return `link=${encodedLink}&&m=${encodedMessage}&&r=${config.radius}&&p=${config.padding}&&pos=${config.pos}&&icon=${icon}`;
  }, [link, config, icon, message]);

  return (
    <Flex alignItems="center" gap="2" wrap="wrap">
      <Flex
        p={10}
        bg={useColorModeValue("gray.100", "gray.700")}
        flexGrow="1"
        direction="column"
        minHeight="100vh"
        gap={7}
      >
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
        <Flex direction="row" alignItems="center">
          <IconButton
            aria-label="Return to dashboard"
            icon={<ChevronLeftIcon />}
            onClick={() => {
              router.push("/");
            }}
          />
          <Text pl={3} fontSize="lg">
            Return to Dashboard
          </Text>
        </Flex>
        {/* Existing Stock Widgets */}
        <Heading size="md"> 🕹️ Custom Button Builder</Heading>
        <FormControl>
          <FormLabel>Button URL</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder={"Enter Url"}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              value={link}
            />
          </InputGroup>
          <FormHelperText>
            Include just the base URL, without https://
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Button Message</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder={"Enter Button Message"}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
          </InputGroup>
        </FormControl>
        <Flex gap={5}>
          <FormControl>
            <FormLabel>Button Radius</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder={"Set Radius"}
                onChange={(e) => {
                  setConfig((ex: any) => {
                    return { ...ex, radius: parseInt(e.target.value) };
                  });
                }}
                value={config.radius}
                type="number"
                max={800}
              />
              <InputRightElement>px</InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Button Padding</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder={"Set Inner Padding"}
                onChange={(e) => {
                  setConfig((ex: any) => {
                    return { ...ex, padding: parseInt(e.target.value) };
                  });
                }}
                value={config.padding}
                type="number"
                max={800}
              />
              <InputRightElement>px</InputRightElement>
            </InputGroup>
          </FormControl>
        </Flex>
        <Flex gap={5} alignItems={"flex-end"}>
          <FormControl>
            <FormLabel>Icon Position</FormLabel>
            <Select
              placeholder={"Set Icon Position"}
              onChange={(e) => {
                setConfig((ex: any) => {
                  return { ...ex, pos: e.target.value };
                });
              }}
              value={config.pos}
            >
              {BUTTON_ICON_POS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.toLocaleUpperCase()}
                </option>
              ))}
            </Select>
          </FormControl>
          {config && config.pos !== "none" && (
            <Flex direction={"row"} minW={"20%"} alignItems={"center"} gap={2}>
              <Text>
                Icon:&nbsp;
                { String.fromCodePoint(parseInt(icon, 16))}
              </Text>
              <Box>
                <Popover>
                  <PopoverTrigger>
                    <IconButton icon={<EditIcon />} aria-label="Edit Icon" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Picker
                      onEmojiClick={(e) => {
                        setIcon(e.unified);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Box>
            </Flex>
          )}
        </Flex>
        <Spacer />
        <Popover>
          <PopoverTrigger>
            <ButtonGroup
              size="sm"
              isAttached
              borderRadius="lg"
              colorScheme="gray"
              minHeight="60px"
              borderWidth="3px"
              display="flex"
            >
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://wotion.co/widgets/button/${linkString}`
                  );
                }}
                flexBasis={0}
                flexGrow={1}
                minHeight="60px"
              >
                <Box isTruncated maxW={500} textDecoration="underline">
                  {`https://wotion.co/widgets/button/${linkString}`}
                </Box>
              </Button>
              <IconButton
                flexBasis="80px"
                size="lg"
                minHeight="60px"
                aria-label="Copy to clipboard"
                icon={<CopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://wotion.co/widgets/button/${linkString}`
                  );
                }}
                variant={"CopyButton"}
              />
            </ButtonGroup>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Copied to Clipboard!</PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Flex
        flexGrow="4"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <ButtonWidget link={link} message={message} config={config} icon={icon}/>
      </Flex>
    </Flex>
  );
}
