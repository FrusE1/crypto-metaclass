import React from "react";

import { CoinModel } from "@store/models/coin";
import formatNumber from "@utils/formatNumber";

import styles from "./CoinList.module.scss";

/** Пропсы, которые принимает компонент CoinList */
export type CoinListProps = {
  /** Информация о криптовалюте */
  coin: CoinModel;
};

const CoinList: React.FC<CoinListProps> = ({ coin }: CoinListProps) => {
  return (
    <ul className={styles.coinList}>
      <li className={styles.coinList__item}>
        <div>Market Cap</div>
        <div>${formatNumber(Number(coin.marketData.marketCap.usd))}</div>
      </li>
      <li className={styles.coinList__item}>
        <div>Fully Diluted Valuation</div>
        <div>
          ${formatNumber(Number(coin.marketData.fullyDilutedValuation.usd))}
        </div>
      </li>
      <li className={styles.coinList__item}>
        <div>Circulating Supply</div>
        <div>{formatNumber(Number(coin.marketData.circulatingSupply))}</div>
      </li>
      <li className={styles.coinList__item}>
        <div>Total Supply</div>
        <div>{formatNumber(Number(coin.marketData.totalSupply))}</div>
      </li>
      <li className={styles.coinList__item}>
        <div>Max Supply</div>
        <div>{formatNumber(Number(coin.marketData.maxSupply))}</div>
      </li>
    </ul>
  );
};

export default CoinList;
