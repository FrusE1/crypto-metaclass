import React from "react";

import formatPrice from "@utils/formatNumber";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./Coin.module.scss";
import CoinList from "./components/CoinList";
import CoinPrice from "./components/CoinPrice";
import HeaderCoin from "./components/HeaderCoin/HeaderCoin";

export type Coin = {
  image: string;
  name: string;
  symbol: string;
  current_price: string;
  change: string;
  percentage: string;
  market_cap: string;
  fully_diluted_valuation: string;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  description: string;
};

const CoinInfo = () => {
  const { id } = useParams();
  const [coin, setCoin] = React.useState<Coin | null>(null);

  async function getCoinInfo(id: string | undefined) {
    let coinInfo = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    setCoin({
      image: coinInfo.data.image.thumb,
      name: coinInfo.data.name,
      symbol: coinInfo.data.symbol,
      current_price: coinInfo.data.market_data.current_price.usd,
      change: coinInfo.data.market_data.price_change_24h,
      percentage: coinInfo.data.market_data.price_change_percentage_24h,
      market_cap: coinInfo.data.market_data.market_cap.usd,
      fully_diluted_valuation:
        coinInfo.data.market_data.fully_diluted_valuation.usd,
      circulating_supply: coinInfo.data.market_data.circulating_supply,
      total_supply: coinInfo.data.market_data.total_supply,
      max_supply: coinInfo.data.market_data.max_supply,
      description: coinInfo.data.description.en,
    });
  }

  React.useEffect(() => {
    getCoinInfo(id);
  }, [id]);

  return (
    <div className={styles.coin}>
      <HeaderCoin coin={coin} />
      <CoinPrice coin={coin} />
      <CoinList coin={coin} />
      <div className={styles.coin__description}>
        <h2>Description</h2>
        <p>{coin?.description || ""}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
