import formatNumber from "@utils/formatNumber";

export type CoinPriceChartItem = {
  date: number;
  value: number;
};

export type CoinChartApi = {
  prices: number[][];
};

export type CoinChartModel = CoinPriceChartItem[];

export const normalizeCoinChart = (from: CoinChartApi): CoinChartModel =>
  from.prices.map((item) => ({
    date: item[0],
    value: item[1],
  }));

export const getInitialCoinChart = (): CoinChartModel => [];
