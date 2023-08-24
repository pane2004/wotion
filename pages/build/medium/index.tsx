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
  AddIcon,
  CopyIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { ARTICLE_OPTIONS, MEDIUM_HELPER_MESSAGES } from "@/constants/constants";
import { MediumFormat, MediumPaperConfig } from "@/types/types";
import MediumNewspaper from "@/components/medium/newspaper";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function MediumBuilder() {
  const router = useRouter();
  const [target, setTarget] = useState<string>("MicrosoftDesign");
  const [format, setFormat] = useState<MediumFormat>("User");
  const [config, setConfig] = useState<MediumPaperConfig>({
    width: 400,
    height: 600,
  });
  const [tempTarget, setTempTarget] = useState<string>(target);

  const linkString = useMemo(() => {
    return `format=${format}&&target=${target}&&w=${config.width}&&h=${config.height}`;
  }, [target, format, config.width, config.height]);

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
        <Heading size="md"> 📰 Medium Article Widget Builder</Heading>
        <FormControl>
          <FormLabel>Article Feed Source</FormLabel>
          <Select
            placeholder={"Select Source"}
            onChange={(e) => {
              setTempTarget("");
              setTarget("");
              setFormat(e.target.value as MediumFormat);
            }}
            value={format}
          >
            {ARTICLE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </FormControl>
        {format && (
          <FormControl>
            <FormLabel>Medium {format}</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder={"Enter Info"}
                onChange={(e) => {
                  setTempTarget(e.target.value);
                }}
                value={tempTarget}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search database"
                  size="sm"
                  icon={<RepeatIcon />}
                  onClick={() => {
                    setTarget(tempTarget);
                  }}
                />
              </InputRightElement>
            </InputGroup>
            <FormHelperText>{MEDIUM_HELPER_MESSAGES[format]}</FormHelperText>
          </FormControl>
        )}
        {format && (
          <Flex gap={5}>
            <FormControl>
              <FormLabel>Page Width</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder={"Set Width"}
                  onChange={(e) => {
                    setConfig((ex: MediumPaperConfig) => {
                      return { ...ex, width: parseInt(e.target.value) };
                    });
                  }}
                  value={config.width}
                  type="number"
                  max={800}
                />
                <InputRightElement>px</InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Page Height</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder={"Enter Height"}
                  onChange={(e) => {
                    setConfig((ex: MediumPaperConfig) => {
                      return { ...ex, height: parseInt(e.target.value) };
                    });
                  }}
                  value={config.height}
                  type="number"
                  max={800}
                />
                <InputRightElement>px</InputRightElement>
              </InputGroup>
            </FormControl>
          </Flex>
        )}
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
                    `https://wotion.co/widgets/medium/${linkString}`
                  );
                }}
                flexBasis={0}
                flexGrow={1}
                minHeight="60px"
              >
                <Box isTruncated maxW={500} textDecoration="underline">
                  {`https://wotion.co/widgets/medium/${linkString}`}
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
                    `https://wotion.co/widgets/medium/${linkString}`
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
        <MediumNewspaper
          target={target}
          format={format}
          key={`${target}-${config.width}-${config.height}-${format}`}
          config={config}
        />
      </Flex>
    </Flex>
  );
}
