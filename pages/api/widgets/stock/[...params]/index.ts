import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { StockData } from "@/types/types";

function formatData(data: any) {
  const change =
    (data.chart.result[0].meta.regularMarketPrice /
      data.chart.result[0].meta.chartPreviousClose) *
      100 -
    100;

  return {
    symbol: data.chart.result[0].meta.symbol,
    exchange:
      data.chart.result[0].meta.exchangeName === "NMS" ? "NASDAQ" : "NYSE",
    currentPrice: data.chart.result[0].meta.regularMarketPrice,
    change: change,
    percentChange: change.toFixed(2),
    timeZone: data.chart.result[0].meta.exchangeTimezoneName,
    open: data.chart.result[0].indicators.quote[0].open[0].toFixed(2),
    close: data.chart.result[0].indicators.quote[0].close[0].toFixed(2),
    high: data.chart.result[0].indicators.quote[0].high[0].toFixed(2),
    low: data.chart.result[0].indicators.quote[0].low[0].toFixed(2),
    volume: data.chart.result[0].indicators.quote[0].volume[0],
    timestamp: data.chart.result[0].timestamp[0],
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { params } = req.query;
  try {
    const axiosRes = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${params?.[0]}?&interval=3mo&range=${params?.[1]}`
    );
    const data = axiosRes.data;
    res.status(200).json(formatData(data) as StockData);
  } catch (error) {
    res.status(500).json({
      error: "There was an error fetching data from Yahoo Finance API.",
    });
  }
}
