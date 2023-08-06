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
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { ChevronLeftIcon, AddIcon, CopyIcon } from "@chakra-ui/icons";
import { ARTICLE_OPTIONS } from "@/constants/stock";
import { MediumFormat } from "@/types/types";
import MediumNewspaper from "@/components/medium/newspaper";

export default function StockBuilder() {
  const [target, setTarget] = useState<string>();
  const [format, setFormat] = useState<MediumFormat>();

  return (
    <Flex alignItems="center" gap="2" wrap="wrap">
      <Flex
        p={10}
        bg="gray.100"
        flexGrow="1"
        direction="column"
        minHeight="100vh"
        gap={7}
      >
        <Heading size="md">Logo Goes Here</Heading>
        <Flex direction="row" alignItems="center">
          <IconButton
            aria-label="Return to dashboard"
            icon={<ChevronLeftIcon />}
          />
          <Text pl={3} fontSize="lg">
            Return to Dashboard
          </Text>
        </Flex>
        {/* Existing Stock Widgets */}
        <Heading size="md"> 📰 Medium Article Widget Builder</Heading>
        <Box>
          <Text fontSize="md">Article Feed Source</Text>
          <Select
            placeholder={"Select Source"}
            onChange={(e) => {
              setTarget(undefined);
              setFormat(e.target.value as MediumFormat);
            }}
          >
            {ARTICLE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </Box>
        {format && (
          <Box>
            <Text fontSize="md">Medium {format}</Text>
            <Input
              placeholder={"Enter Info"}
              onChange={(e) => {
                setTarget(e.target.value);
              }}
            />
          </Box>
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
                    `http://localhost:3000/widgets/medium`
                  );
                }}
                flexBasis={0}
                flexGrow={1}
                minHeight="60px"
              >
                <Box isTruncated maxW={500} textDecoration="underline">
                  {`http://localhost:3000/widgets/medium`}
                </Box>
              </Button>
              <IconButton
                flexBasis="80px"
                size="lg"
                minHeight="60px"
                aria-label="Copy to clipboard"
                icon={<CopyIcon />}
                colorScheme="blue"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `http://localhost:3000/widgets/medium`
                  );
                }}
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
        <MediumNewspaper target={target} format={format} key={target}/>
      </Flex>
    </Flex>
  );
}
