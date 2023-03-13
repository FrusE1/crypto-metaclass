export type CoinMarketDataApi = {
  current_price: Record<string, string>;
  price_change_24h: string;
  price_change_percentage_24h: string;
  market_cap: Record<string, string>;
  fully_diluted_valuation: Record<string, string>;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
};

export type CoinMarketDataModel = {
  currentPrice: Record<string, string>;
  priceChange: string;
  priceChangePercentage: string;
  marketCap: Record<string, string>;
  fullyDilutedValuation: Record<string, string>;
  circulatingSupply: string;
  totalSupply: string;
  maxSupply: string;
};

export type CoinApi = {
  image: Record<string, string>;
  name: string;
  symbol: string;
  market_data: CoinMarketDataApi;
  description: Record<string, string>;
};

export type CoinModel = {
  image: Record<string, string>;
  name: string;
  symbol: string;
  marketData: CoinMarketDataModel;
  description: Record<string, string>;
};

export const normalizeCoin = (from: CoinApi): CoinModel => ({
  image: from.image,
  name: from.name,
  symbol: from.symbol,
  marketData: normalizeCoinMarketData(from.market_data),
  description: from.description,
});

export const normalizeCoinMarketData = (
  from: CoinMarketDataApi
): CoinMarketDataModel => ({
  currentPrice: from.current_price,
  priceChange: from.price_change_24h,
  priceChangePercentage: from.price_change_percentage_24h,
  marketCap: from.market_cap,
  fullyDilutedValuation: from.fully_diluted_valuation,
  circulatingSupply: from.circulating_supply,
  totalSupply: from.total_supply,
  maxSupply: from.max_supply,
});

export const getInitialCoinModel = (): CoinModel => {
  return {
    image: {},
    name: "",
    symbol: "",
    marketData: {
      currentPrice: {},
      priceChange: "",
      priceChangePercentage: "",
      marketCap: {},
      fullyDilutedValuation: {},
      circulatingSupply: "",
      totalSupply: "",
      maxSupply: "",
    },
    description: {},
  };
};
