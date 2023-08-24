import { StockConfig, StockInterval, MediumFormat, WidgetDisplay, IconPositions } from "@/types/types";
import MediumImg from "../public/medium.gif";
import SpotifyImg from "../public/spotify.gif";
import StockImg from "../public/stock.png";
import QuoteImg from "../public/quote.png"
import ButtonImg from "../public/button.gif"

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
  },
];

export const STOCK_INTERVALS: StockInterval[] = [
  "1d",
  "5d",
  "1wk",
  "1mo",
  "3mo",
  "6mo",
  "1y",
  "2y",
  "5y",
  "10y",
  "ytd",
];

export const ARTICLE_OPTIONS: MediumFormat[] = [
  "User",
  "Publication",
  "Tag",
  "Custom",
];

export const MEDIUM_LOGO = () => (
  <svg viewBox="0 0 3940 610" width="40%">
    <path d="M594.79 308.2c0 163.76-131.85 296.52-294.5 296.52S5.8 472 5.8 308.2 137.65 11.69 300.29 11.69s294.5 132.75 294.5 296.51M917.86 308.2c0 154.16-65.93 279.12-147.25 279.12s-147.25-125-147.25-279.12S689.29 29.08 770.61 29.08s147.25 125 147.25 279.12M1050 308.2c0 138.12-23.19 250.08-51.79 250.08s-51.79-112-51.79-250.08 23.19-250.08 51.8-250.08S1050 170.09 1050 308.2M1862.77 37.4l.82-.18v-6.35h-167.48l-155.51 365.5-155.51-365.5h-180.48v6.35l.81.18c30.57 6.9 46.09 17.19 46.09 54.3v434.45c0 37.11-15.58 47.4-46.15 54.3l-.81.18V587H1327v-6.35l-.81-.18c-30.57-6.9-46.09-17.19-46.09-54.3V116.9L1479.87 587h11.33l205.59-483.21V536.9c-2.62 29.31-18 38.36-45.68 44.61l-.82.19v6.3h213.3v-6.3l-.82-.19c-27.71-6.25-43.46-15.3-46.08-44.61l-.14-445.2h.14c0-37.11 15.52-47.4 46.08-54.3m97.43 287.8c3.49-78.06 31.52-134.4 78.56-135.37 14.51.24 26.68 5 36.14 14.16 20.1 19.51 29.55 60.28 28.09 121.21zm-2.11 22h250v-1.05c-.71-59.69-18-106.12-51.34-138-28.82-27.55-71.49-42.71-116.31-42.71h-1c-23.26 0-51.79 5.64-72.09 15.86-23.11 10.7-43.49 26.7-60.45 47.7-27.3 33.83-43.84 79.55-47.86 130.93-.13 1.54-.24 3.08-.35 4.62s-.18 2.92-.25 4.39a332.64 332.64 0 0 0-.36 21.69C1860.79 507 1923.65 600 2035.3 600c98 0 155.07-71.64 169.3-167.8l-7.19-2.53c-25 51.68-69.9 83-121 79.18-69.76-5.22-123.2-75.95-118.35-161.63m532.69 157.68c-8.2 19.45-25.31 30.15-48.24 30.15s-43.89-15.74-58.78-44.34c-16-30.7-24.42-74.1-24.42-125.51 0-107 33.28-176.21 84.79-176.21 21.57 0 38.55 10.7 46.65 29.37zm165.84 76.28c-30.57-7.23-46.09-18-46.09-57V5.28L2424.77 60v6.7l1.14-.09c25.62-2.07 43 1.47 53.09 10.79 7.9 7.3 11.75 18.5 11.75 34.26v71.14c-18.31-11.69-40.09-17.38-66.52-17.38-53.6 0-102.59 22.57-137.92 63.56-36.83 42.72-56.3 101.1-56.3 168.81C2230 518.72 2289.53 600 2378.13 600c51.83 0 93.53-28.4 112.62-76.3V588h166.65v-6.66zm159.29-505.33c0-37.76-28.47-66.24-66.24-66.24-37.59 0-67 29.1-67 66.24s29.44 66.24 67 66.24c37.77 0 66.24-28.48 66.24-66.24m43.84 505.33c-30.57-7.23-46.09-18-46.09-57h-.13V166.65l-166.66 47.85v6.5l1 .09c36.06 3.21 45.93 15.63 45.93 57.77V588h166.8v-6.66zm427.05 0c-30.57-7.23-46.09-18-46.09-57V166.65L3082 212.92v6.52l.94.1c29.48 3.1 38 16.23 38 58.56v226c-9.83 19.45-28.27 31-50.61 31.78-36.23 0-56.18-24.47-56.18-68.9V166.66l-166.66 47.85V221l1 .09c36.06 3.2 45.94 15.62 45.94 57.77v191.27a214.48 214.48 0 0 0 3.47 39.82l3 13.05c14.11 50.56 51.08 77 109 77 49.06 0 92.06-30.37 111-77.89v66h166.66v-6.66zM3934.2 588v-6.67l-.81-.19c-33.17-7.65-46.09-22.07-46.09-51.43v-243.2c0-75.83-42.59-121.09-113.93-121.09-52 0-95.85 30.05-112.73 76.86-13.41-49.6-52-76.86-109.06-76.86-50.12 0-89.4 26.45-106.25 71.13v-69.87l-166.66 45.89v6.54l1 .09c35.63 3.16 45.93 15.94 45.93 57V588h155.5v-6.66l-.82-.2c-26.46-6.22-35-17.56-35-46.66V255.72c7-16.35 21.11-35.72 49-35.72 34.64 0 52.2 24 52.2 71.28V588h155.54v-6.66l-.82-.2c-26.46-6.22-35-17.56-35-46.66v-248a160.45 160.45 0 0 0-2.2-27.68c7.42-17.77 22.34-38.8 51.37-38.8 35.13 0 52.2 23.31 52.2 71.28V588z"></path>
  </svg>
);

export const MEDIUM_HELPER_MESSAGES = {
  User: "Copy the username without the @: https://medium.com/@USERNAME",
  Publication:
    "Copy the publication name in the link: https://medium.com/PUBLICATION",
  Tag: "Copy the tag/topic name from: https://medium.com/tag/TAG",
  Custom:
    "Copy the custom domain, must be a subdomain of medium. Ex: medium.datadriveninvestor.com",
};

export const SPOTIFY_LOGO = () => (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
  >
    <path
      fill="currentColor"
      d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
    ></path>
  </svg>
);

export const VINYL_RECORD = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="svg2"
    version="1.0"
    {...props}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 400 400"
  >
    <defs id="defs4">
      <linearGradient id="linearGradient3273">
        <stop style={{stopColor: "#6c6c6c" }}offset="0" id="stop3275" />
        <stop style={{stopColor: "#3e3e3e"}} offset="1" id="stop3277" />
      </linearGradient>
      <linearGradient id="linearGradient3263">
        <stop style={{stopColor: "#f7f7f7"}} offset="0" id="stop3265" />
        <stop style={{stopColor: "#e1e1e1"}} offset="1" id="stop3267" />
      </linearGradient>
      <linearGradient id="linearGradient3153">
        <stop style={{stopColor: "#ffffff"}} offset="0" id="stop3155" />
        <stop
          style={{stopColor: "#ffffff", stopOpacity: "0"}}
          offset="1"
          id="stop3157"
        />
      </linearGradient>
      <filter id="filter3315">
        <feGaussianBlur stdDeviation="3.7" id="feGaussianBlur3317" />
      </filter>
      <radialGradient
        xlinkHref="#linearGradient3153"
        id="radialGradient3328"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-0.8695893,0.8695893,-1.9614862,-1.9614862,681.5104,178.1413)"
        cx="289.42923"
        cy="209.66924"
        fx="289.42923"
        fy="209.66924"
        r="92.5"
      />
      <radialGradient
        xlinkHref="#linearGradient3263"
        id="radialGradient3349"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0,2.8728591,-1,0,392.84375,-372.50696)"
        cx="199.28125"
        cy="192.84375"
        fx="199.28125"
        fy="192.84375"
        r="53.6875"
      />
      <radialGradient
        xlinkHref="#linearGradient3273"
        id="radialGradient3352"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0,2.7782148,-0.82387859,0,358.87983,-353.64609)"
        cx="199.28125"
        cy="192.84375"
        fx="199.28125"
        fy="192.84375"
        r="68.84375"
      />
    </defs>
    <use
      x="0"
      y="0"
      xlinkHref="#path3191"
      id="use31"
      transform="translate(2.71429,4)"
      width="100%"
      height="100%"
      style={{fillOpacity: 0.5, filter: "url(#filter3315)"}}
    />
    <path
      id="path3191"
      d="M 200,15 C 97.88,15 15,97.88 15,200 15,302.12 97.88,385 200,385 302.12,385 385,302.12 385,200 385,97.88 302.12,15 200,15 Z m 0,179.8125 c 2.86645,0 5.18749,2.32105 5.1875,5.1875 0,2.86645 -2.32105,5.18749 -5.1875,5.1875 -2.86645,0 -5.18749,-2.32105 -5.1875,-5.1875 0,-2.86645 2.32105,-5.18749 5.1875,-5.1875 z"
    />
    <path
      id="path3271"
      d="m 200,132.65625 c -37.15925,0 -67.34375,30.1845 -67.34375,67.34375 0,37.15925 30.1845,67.34375 67.34375,67.34375 37.15925,0 67.34375,-30.1845 67.34375,-67.34375 0,-37.15925 -30.1845,-67.34375 -67.34375,-67.34375 z m 0,62.90625 c 2.45408,0 4.4375,1.98342 4.4375,4.4375 0,2.45408 -1.98342,4.4375 -4.4375,4.4375 -2.45408,0 -4.4375,-1.98342 -4.4375,-4.4375 0,-2.45408 1.98342,-4.4375 4.4375,-4.4375 z"
      style={{fill: "#333333"}}
    />
    <path
      id="path3176"
      d="M 200,16.78125 C 301.15637,16.78125 383.21875,98.843633 383.21875,200 383.21877,301.15637 301.15637,383.21875 200,383.21875 98.843633,383.21875 16.78125,301.15637 16.78125,200 16.78125,98.843633 98.843633,16.78125 200,16.78125 Z"
      style={{ fill:"none", stroke: "#000000", strokeWidth: "3.562" }}
    />
    <use
      height="100%"
      width="100%"
      transform="rotate(180,200,200)"
      id="use3151"
      xlinkHref="#path3193"
      y="0"
      x="0"
    />
    <path
      id="path3193"
      d="m 106.4375,200 c 0,-51.65143 41.91107,-93.59375 93.5625,-93.59375 V 18.5625 C 99.85143,18.5625 18.56249,99.85142 18.5625,200 Z"
      style={{fill: "url(#radialGradient3328)"}}
    />
    <path
      id="path3215"
      d="M 200,132.6875 C 237.16701,132.6875 267.3125,162.83298 267.3125,200 267.3125,237.16701 237.16701,267.31445 200,267.31445 162.83299,267.31445 132.68555,237.16701 132.68555,200 132.68555,162.83298 162.83299,132.6875 200,132.6875 Z"
      style={{ fill:"none", stroke:"#000000", strokeWidth: "3"}}
    />
    <path
      id="path3223"
      d="m 237.9628,162.03721 c -20.95262,-20.9526 -54.97299,-20.95261 -75.9256,0 -20.9526,20.95262 -20.9526,54.97299 0,75.92559 20.95262,20.9526 54.97299,20.95261 75.9256,0 20.9526,-20.95261 20.9526,-54.97298 0,-75.92559 z m -34.29468,34.29468 c 2.02688,2.02689 2.02688,5.30934 0,7.33623 -2.02689,2.02689 -5.30934,2.02688 -7.33624,0 -2.02688,-2.02688 -2.02688,-5.30934 0,-7.33623 2.02689,-2.02688 5.30934,-2.02688 7.33624,0 z"
      style={{fill: "url(#radialGradient3349)" }}
    />
    <path
      id="path3230"
      d="m 243.95111,156.0489 c -7.06177,-7.06176 -15.40617,-12.05335 -24.2847,-15.00392 l -1.23744,3.71231 c 8.31532,2.76444 16.12455,7.46249 22.7379,14.07584 8.05626,8.05626 13.25594,17.88433 15.60055,28.24008 l 3.82279,-0.86178 c -2.50205,-11.05558 -8.03761,-21.56103 -16.6391,-30.16253 z"
      style={{opacity:0.7425743, fill: "#ffffff" }}
    />
    <path
      id="path3232"
      d="m 142.61386,190.25519 -3.88908,-0.66291 c -3.23715,19.17313 2.53847,39.5732 17.32411,54.35884 14.74595,14.74593 35.07597,20.5264 54.20416,17.34621 l -0.64082,-3.86699 c -17.92511,2.98388 -36.96183,-2.44619 -50.7791,-16.26346 -13.85228,-13.85228 -19.25338,-32.94694 -16.21927,-50.91169 z"
      style={{opacity:0.7425743, fill: "#ffffff" }}
    />
  </svg>
);

export const WIDGET_DISPLAY_SCHEMA: WidgetDisplay[] = [
  {
    id: "stock",
    title: "Stock Tracker",
    img: StockImg,
    description: "A responsive live stock data widget for your Notion docs.",
    path: "/build/stock",
  },
  {
    id: "spotify",
    title: "Spotify Player",
    img: SpotifyImg,
    description:
      "Aesthetic, minimalist Spotify embedded widget with a carousel.",
    path: "/build/spotify",
  },
  {
    id: "medium",
    title: "Medium Reader",
    img: MediumImg,
    description:
      "Catch up on your favourite Medium publications, authors, and tags.",
    path: "/build/medium",
  },
  {
    id: "quote",
    title: "Quote Widget",
    img: QuoteImg,
    description:
      "Display an inspiring quote in your doc.",
    path: "/build/quote",
  },
  {
    id: "button",
    title: "Custom Button Widget",
    img: ButtonImg,
    description:
      "Display a fully customizable button.",
    path: "/build/button",
  },
];

export const FEATURES = [
  {
    id: 1,
    title: 'Completely Customizable',
    text: 'Easily customize each widget to your specifications in the builder.',
  },
  {
    id: 2,
    title: 'Auto-Resizing',
    text: 'Each widget is responsive and will adapt based on the screen size.',
  },
  {
    id: 3,
    title: 'Performance',
    text: 'Widgets are optimized to not slow down your Notion doc.',
  },
  {
    id: 4,
    title: 'Plug and Play',
    text: 'No sign ups, accounts, or plans needed. Just copy the embedded link!',
  },
]

export const BG_BLUR_IMAGE = "https://uploads-ssl.webflow.com/5a9ee6416e90d20001b20038/62daa85b754c76862ab38772_h64k38NO_Y5PhWFObsfYEeYeR-V4PlHL5_ZQjfAeJTwbrmk2GNHXDnPxX4egNq8E4ryvGh_PV7iZTI2AgyJ3VAWVmBQ2Vu5rZO5O3a93UqV0eLan9FOYIxDOG-IQVY7qCiG-8-0k0R7OMiNx9zrTaLE.png"

export const BUTTON_ICON_POS_OPTIONS: IconPositions[] = ["left", "right", "none"];