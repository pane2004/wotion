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
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  AddIcon,
  CopyIcon,
  DeleteIcon,
  SmallCloseIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";

import {
  DndContext,
  closestCenter,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DEFAULT_STOCK_CARDS_CONFIG } from "@/constants/stock";
import { SpotifyConfig } from "@/types/types";
import SpotifyCarousel from "@/components/spotify/carousel";

export default function SpotifyBuilder() {
  const [urls, setUrls] = useState<string[]>([
    "https://open.spotify.com/track/2qOm7ukLyHUXWyR4ZWLwxA?",
  ]);
  const [config, setConfig] = useState<SpotifyConfig>({
    record: false,
    shuffle: false,
    auto: true,
    logo: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 150,
      },
    })
  );

  const urlChangeHandler = (url: string, e: any) => {
    setUrls((prev) => {
      return prev.map((oldUrl) => (oldUrl === url ? e.target.value : oldUrl));
    });
  };

  const newHandler = () => {
    setUrls((prev) => {
      if (!prev.includes("")) return [...prev, ""];
      return prev;
    });
  };

  const deleteHandler = (url: string) => {
    setUrls((urls) => {
      return urls.filter((item) => item !== url);
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log(event);
    if (active.id !== over.id) {
      setUrls((urls) => {
        const activeIndex = urls.findIndex((url) => url === active.id);
        const overIndex = urls.findIndex((url) => url === over.id);
        return arrayMove(urls, activeIndex, overIndex);
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
        <Heading size="md"> 🎧 Cleannn Spotify Widget Builder</Heading>

        <Flex direction="column" overflowY="auto" maxHeight="70vh">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={urls}
              strategy={verticalListSortingStrategy}
            >
              {urls.length > 0 &&
                urls.map((url, i) => (
                  <Box key={`${i}`} p={1}>
                    <UrlEditor
                      url={url}
                      urlChangeHandler={urlChangeHandler}
                      deleteHandler={deleteHandler}
                    />
                  </Box>
                ))}
            </SortableContext>
          </DndContext>
          <Text as="u" fontSize="xs">
            <Link
              target="_blank"
              href="https://support.symdistro.com/hc/en-us/articles/360039036711-Spotify-How-to-obtain-a-URI-URL"
            >
              How to find the link?
            </Link>
          </Text>
        </Flex>
        {/* New Stock Widget in Stack */}
        {urls && (
          <Button
            borderRadius="lg"
            size="md"
            colorScheme="gray"
            leftIcon={<AddIcon />}
            variant="outline"
            minHeight="50px"
            borderWidth="2px"
            onClick={newHandler}
          >
            Add Album/Track
          </Button>
        )}
        <Flex dir="row" alignItems={"center"}>
          <FormControl>
            <FormLabel>Record Style</FormLabel>
            <Switch
              size="lg"
              isChecked={config.record}
              onChange={(e) => {
                setConfig((prev: SpotifyConfig) => {
                  return { ...prev, record: e.target.checked };
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Shuffle</FormLabel>
            <Switch
              size="lg"
              isChecked={config.shuffle}
              onChange={(e) => {
                setConfig((prev: SpotifyConfig) => {
                  return { ...prev, shuffle: e.target.checked };
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Autoplay</FormLabel>
            <Switch
              size="lg"
              isChecked={config.auto}
              onChange={(e) => {
                setConfig((prev: SpotifyConfig) => {
                  return { ...prev, auto: e.target.checked };
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Spotify Logo</FormLabel>
            <Switch
              size="lg"
              isChecked={config.logo}
              onChange={(e) => {
                setConfig((prev: SpotifyConfig) => {
                  return { ...prev, logo: e.target.checked };
                });
              }}
            />
          </FormControl>
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
                    `http://localhost:3000/widgets/spotify`
                  );
                }}
                flexBasis={0}
                flexGrow={1}
                minHeight="60px"
              >
                <Box isTruncated maxW={500} textDecoration="underline">
                  {`http://localhost:3000/widgets/spotify`}
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
                    `http://localhost:3000/widgets/spotify`
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
        <Box maxW="40vh" maxH="40vh">
          <SpotifyCarousel config={config} urls={urls} />
        </Box>
      </Flex>
    </Flex>
  );
}

export function UrlEditor({
  url,
  urlChangeHandler,
  deleteHandler,
}: {
  url: string;
  urlChangeHandler: any;
  deleteHandler: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Flex dir="row" alignItems={"center"} bg="gray.100">
        <DragHandleIcon />
        <InputGroup>
          <Input
            placeholder={"Enter Song/Album link"}
            value={url}
            onChange={(e) => {
              urlChangeHandler(url, e);
            }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Delete Entry"
              icon={<SmallCloseIcon />}
              size="sm"
              onClick={() => {
                deleteHandler(url);
              }}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}
