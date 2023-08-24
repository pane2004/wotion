import { StaticImageData } from "next/image";

export type StockConfig = {
  id: string;
  stock: string;
  interval: StockInterval;
  showVolume: boolean;
  showOpen: boolean;
  showClose: boolean;
  showHigh: boolean;
  showLow: boolean;
};

export type StockInterval =
  | "1d"
  | "5d"
  | "1wk"
  | "1mo"
  | "3mo"
  | "6mo"
  | "1y"
  | "2y"
  | "5y"
  | "10y"
  | "ytd";

export type StockData =
  | {
      symbol: string;
      exchange: "NYSE" | "NASDAQ";
      currentPrice: number;
      change: number;
      percentChange: string;
      timeZone: string;
      open: string;
      close: string;
      high: string;
      low: string;
      volume: number;
      timestamp: number;
    }
  | undefined;

export type MediumData = {
  author: string;
  authorImg: string;
  articles: any;
};

export type MediumFormat = "User" | "Publication" | "Tag" | "Custom";

export type MediumPaperConfig = {
  width: number;
  height: number;
};

export type SpotifyConfig = {
  record: boolean;
  shuffle: boolean;
  auto: boolean;
  logo: boolean;
};

export type WidgetDisplay = {
  id: string;
  title: string;
  img: StaticImageData;
  description: string;
  path: string;
};

export type IconPositions = "left" | "right" | "none";

export type ButtonConfig = {
  radius: number;
  padding: number;
  pos: IconPositions;
};
