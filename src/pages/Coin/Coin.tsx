import React from "react";

import vector from "@assets/Vector.svg";
import formatPrice from "@utils/formatPrice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Coin.module.scss";

var classNames = require("classnames");

type Coin = {
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
  const navigate = useNavigate();
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

  const goToPageMain = (): void => {
    navigate("/");
  };

  React.useEffect(() => {
    getCoinInfo(id);
  }, []);

  return (
    <div className={styles.coin}>
      <div className={styles.coin__header}>
        <img
          className={styles.coin__vector}
          onClick={() => goToPageMain()}
          src={vector}
        ></img>
        <img
          className={styles.coin__img}
          src={coin?.image}
          alt={coin?.name}
        ></img>
        <div className={styles.coin__name}>
          {coin?.name}
          <span>({coin?.symbol})</span>
        </div>
      </div>
      <div className={styles.coin__price}>
        <div className={styles.coin__price_main}>
          ${formatPrice(Number(coin?.current_price))}
        </div>
        <div
          className={classNames(
            styles.coin__price_percentage,
            Number(coin?.change) > 0 ? styles.price_green : styles.price_red
          )}
        >
          {+formatPrice(Number(coin?.change)) > 0 && "+"}
          {coin?.change} ({formatPrice(Number(coin?.percentage))}%)
        </div>
      </div>
      <ul className={styles.coin__list}>
        <li className={styles.coin__item}>
          <div>Market Cap</div>
          <div>${formatPrice(Number(coin?.market_cap))}</div>
        </li>
        <li className={styles.coin__item}>
          <div>Fully Diluted Valuation</div>
          <div>${formatPrice(Number(coin?.fully_diluted_valuation))}</div>
        </li>
        <li className={styles.coin__item}>
          <div>Circulating Supply</div>
          <div>{formatPrice(Number(coin?.circulating_supply))}</div>
        </li>
        <li className={styles.coin__item}>
          <div>Total Supply</div>
          <div>{formatPrice(Number(coin?.total_supply))}</div>
        </li>
        <li className={styles.coin__item}>
          <div>Max Supply</div>
          <div>{formatPrice(Number(coin?.max_supply))}</div>
        </li>
      </ul>
      <div className={styles.coin__description}>
        <h2>Description</h2>
        <p>{coin?.description}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
