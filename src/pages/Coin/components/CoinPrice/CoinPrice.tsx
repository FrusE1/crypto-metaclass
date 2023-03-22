import React from "react";

import { CoinModel } from "@store/models/coin";
import formatNumber from "@utils/formatNumber";
import classNames from "classnames";

import styles from "./CoinPrice.module.scss";

/** Пропсы, которые принимает компонент CoinPrice */
export type CoinPriceProps = {
  /** Информация о криптовалюте */
  coin: CoinModel;
};

const CoinPrice: React.FC<CoinPriceProps> = ({ coin }: CoinPriceProps) => {
  return (
    <div className={styles.coinPrice}>
      <div className={styles.coinPrice__main}>
        ${formatNumber(Number(coin.marketData.currentPrice.usd))}
      </div>
      <div
        className={classNames(
          styles.coinPrice__percentage,
          Number(coin.marketData.priceChange) > 0 ? styles.green : styles.red
        )}
      >
        {Number(coin.marketData.priceChange) > 0 && "+"}
        {formatNumber(Number(coin.marketData.priceChange), {
          maximumFractionDigits: 3,
        })}{" "}
        ({formatNumber(Number(coin.marketData.priceChangePercentage))}%)
      </div>
    </div>
  );
};

export default CoinPrice;
