import { StockConfig } from "@/types/types";

export const DEFAULT_STOCK_CARDS_CONFIG: StockConfig[] = [
  {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    stock: "AMC",
    interval: "1d",
    showVolume: true,
    showOpen: true,
    showClose: true,
    showHigh: true,
    showLow: true,
    dark: false,
  },
  {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    stock: "GME",
    interval: "1d",
    showVolume: true,
    showOpen: true,
    showClose: true,
    showHigh: false,
    showLow: false,
    dark: false,
  },
  {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    stock: "AAPL",
    interval: "1mo",
    showVolume: false,
    showOpen: false,
    showClose: false,
    showHigh: true,
    showLow: true,
    dark: false,
  },
];
