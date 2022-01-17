import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export enum CHART_TYPES {
  LINE,
  CANDLESTICK,
}

export const chartTypes = atom({
  key: "chartTypes",
  default: CHART_TYPES.CANDLESTICK,
});
