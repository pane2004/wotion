import { useState } from "react";

import {
  Flex,
  Box,
  Heading,
  Button,
  Spacer,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, AddIcon } from "@chakra-ui/icons";

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

import { DEFAULT_STOCK_CARDS_CONFIG } from "@/constants/stock";
import { StockConfig, StockInterval } from "@/types/types";

import StockConfigCard from "./configcard";
import StockCard from "@/components/stock/stockcard";

export default function StockBuilder() {
  const [stockConfigs, setStockConfigs] = useState<StockConfig[]>(
    DEFAULT_STOCK_CARDS_CONFIG
  );
  console.log(stockConfigs);
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
        bg="gray.100"
        flexGrow="1"
        justify="space-between"
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
        <Heading size="md"> 📈 Stock Price Widget Builder</Heading>

        <Flex direction="column" overflowY="auto" maxHeight="60vh">
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
        <Spacer />
      </Flex>
      <Flex
        flexGrow="5"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={5}
      >
        {stockConfigs.length > 0 &&
          stockConfigs.map((widget, i) => (
            <StockCard key={`${widget.id}-${i}`} config={widget} />
          ))}
      </Flex>
    </Flex>
  );
}
