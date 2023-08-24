import { ButtonConfig } from "@/types/types";
import { Box, Button, Link } from "@chakra-ui/react";

export default function ButtonWidget({
  link,
  message,
  icon,
  config,
}: {
  config: ButtonConfig;
  link: string;
  message: string;
  icon: string;
}) {

  return (
    <Box p={5}>
      <Link href={`https://${link}`} target="_blank">
        <Button p={config.padding} borderRadius={config.radius}>
          {`${config.pos === "left" ? String.fromCodePoint(parseInt(icon, 16)) : ""} `}
          {message}
          {` ${config.pos === "right" ? String.fromCodePoint(parseInt(icon, 16)) : ""}`}
        </Button>
      </Link>
    </Box>
  );
}
