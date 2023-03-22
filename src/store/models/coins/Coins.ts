export type CoinsSearchApi = {
  coins: CoinsSearchId[];
};

export type CoinsSearchId = {
  id: string;
};

export type CoinsSearchModel = {
  id: string;
};

export type CoinsApi = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: string;
};

export type CoinsModel = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  currentPrice: string;
  priceChangePercentage: string;
};

export const normalizeCoins = (from: CoinsApi): CoinsModel => ({
  id: from.id,
  image: from.image,
  name: from.name,
  symbol: from.symbol,
  currentPrice: from.current_price,
  priceChangePercentage: from.price_change_percentage_24h,
});

export const normalizeCoinsSearch = (
  from: CoinsSearchId
): CoinsSearchModel => ({
  id: from.id,
});
