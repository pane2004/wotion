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
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, AddIcon, CopyIcon } from "@chakra-ui/icons";

import {
  DndContext,
  closestCenter,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DEFAULT_STOCK_CARDS_CONFIG } from "@/constants/constants";
import { StockConfig, StockInterval } from "@/types/types";

import StockConfigCard from "./configcard";
import StockCard from "@/components/stock/stockcard";
import { useRouter } from "next/router";
import logo from "../../../public/logo.png";
import Image from "next/image";

/*
  General Format of Data in Link - CANNOT have deeply nested data

  /PARAM1/PARAM2/...
  /field1=value&&field2=value&&.../...

  example: 
  /ticker=AMC&&interval=1m&&open&&close=false&&volume=true/ticker=GME... etc
*/

export default function StockBuilder() {
  const router = useRouter();
  const [stockConfigs, setStockConfigs] = useState<StockConfig[]>(
    DEFAULT_STOCK_CARDS_CONFIG
  );

  const linkString = useMemo(() => {
    return stockConfigs
      .map((item) => {
        const itemString = Object.entries(item)
          .map(([key, value]) => {
            if (key === "id") {
              return;
            }
            if (typeof value === "boolean") {
              return value ? key : `!${key}`;
            }
            return `${key}=${value}`;
          })
          .filter((str) => str)
          .join("&&");

        return `/${itemString}`;
      })
      .join("");
  }, [stockConfigs]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 150,
      },
    })
  );

  const configChangeHandler = (
    change: string | boolean,
    property: string,
    id: string
  ) => {
    setStockConfigs((prev) => {
      const newConfigs: StockConfig[] = prev.map((val) => {
        if (val.id === id) {
          return {
            ...val,
            [property]: change,
          };
        }
        return val;
      });
      return newConfigs;
    });
  };

  const newHandler = () => {
    setStockConfigs((prev) => {
      return [
        ...prev,
        {
          ...DEFAULT_STOCK_CARDS_CONFIG[0],
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        },
      ];
    });
  };

  const deleteHandler = (id: string) => {
    setStockConfigs((prev) => {
      return prev.filter((val) => val.id !== id);
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setStockConfigs((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <Flex alignItems="center" gap="2" wrap="wrap">
      <Flex
        p={10}
        bg={useColorModeValue("gray.100", "gray.700")}
        flexGrow="1"
        justify="space-between"
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
        <Heading size="md"> 📈 Stock Price Widget Builder</Heading>

        <Flex direction="column" overflowY="auto" maxHeight="70vh">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={stockConfigs}
              strategy={verticalListSortingStrategy}
            >
              {stockConfigs.length > 0 &&
                stockConfigs.map((widget, i) => (
                  <StockConfigCard
                    key={`${widget.id}-${i}`}
                    id={widget.id}
                    widget={widget}
                    configChangeHandler={configChangeHandler}
                    deleteHandler={deleteHandler}
                  />
                ))}
            </SortableContext>
          </DndContext>
        </Flex>
        {/* New Stock Widget in Stack */}
        {stockConfigs && !(stockConfigs.length > 4) && (
          <Button
            borderRadius="lg"
            size="md"
            colorScheme="gray"
            leftIcon={<AddIcon />}
            variant="outline"
            minHeight="80px"
            borderWidth="2px"
            onClick={newHandler}
          >
            New Stock
          </Button>
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
                    `https://wotion.co/widgets/stock${linkString}`
                  );
                }}
                flexBasis={0}
                flexGrow={1}
                minHeight="60px"
              >
                <Box isTruncated maxW={500} textDecoration="underline">
                  {`https://wotion.co/widgets/stock${linkString}`}
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
                    `https://wotion.co/widgets/stock${linkString}`
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
        <VStack
          gap={5}
          padding={1}
        >
          {stockConfigs.length > 0 &&
            stockConfigs.map((widget, i) => (
              <StockCard key={`${widget.id}-${i}`} config={widget} />
            ))}
        </VStack>
      </Flex>
    </Flex>
  );
}
