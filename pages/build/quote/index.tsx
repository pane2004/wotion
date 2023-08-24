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
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/logo.png";
import QuoteWidget from "@/components/quote/quote";

export default function QuoteBuilder() {
  const router = useRouter();
  const [quote, setQuote] = useState<string>("A person who never made a mistake never tried anything new.");
  const [speaker, setSpeaker] = useState<string>("Albert Einstein");

  const linkString = useMemo(() => {
    const encodedQuote = encodeURIComponent(quote);
    const encodedSpeaker = encodeURIComponent(speaker);
    return `quote=${encodedQuote}&&speaker=${encodedSpeaker}`;
  }, [quote, speaker]);

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
        <Heading size="md"> 🗣️ Quote Builder</Heading>
        <FormControl>
          <FormLabel>Quote</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder={"Enter Quote"}
              onChange={(e) => {
                setQuote(e.target.value);
              }}
              value={quote}
            />
          </InputGroup>
          <FormHelperText>
            Anything you feel is inspirational!
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Author</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder={"Enter Author"}
              onChange={(e) => {
                setSpeaker(e.target.value);
              }}
              value={speaker}
            />
          </InputGroup>
        </FormControl>
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
                    `https://wotion.co/widgets/quote/${linkString}`
                  );
                }}
                flexBasis={0}
                flexGrow={1}
                minHeight="60px"
              >
                <Box isTruncated maxW={500} textDecoration="underline">
                  {`https://wotion.co/widgets/quote/${linkString}`}
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
                    `https://wotion.co/widgets/quote/${linkString}`
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
        <QuoteWidget quote={quote} speaker={speaker}/>
      </Flex>
    </Flex>
  );
}