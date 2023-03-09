import React from "react";

import { Coin } from "@pages/Coin/Coin";
import formatNumber from "@utils/formatNumber";

import styles from "./CoinPrice.module.scss";

var classNames = require("classnames");

/** Пропсы, которые принимает компонент CoinPrice */
export type CoinPriceProps = {
  /** Информация о криптовалюте */
  coin: Coin | null;
};

const CoinPrice: React.FC<CoinPriceProps> = ({ coin }: CoinPriceProps) => {
  return (
    <div className={styles.coinPrice}>
      <div className={styles.coinPrice__main}>
        ${formatNumber(Number(coin?.current_price))}
      </div>
      <div
        className={classNames(
          styles.coinPrice__percentage,
          Number(coin?.change) > 0 ? styles.price_green : styles.price_red
        )}
      >
        {+formatNumber(Number(coin?.change)) > 0 && "+"}
        {formatNumber(Number(coin?.change), { maximumFractionDigits: 3 })} (
        {formatNumber(Number(coin?.percentage))}%)
      </div>
    </div>
  );
};

export default CoinPrice;
