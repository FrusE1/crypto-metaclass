import React from "react";

import { Coin } from "@pages/Coin/Coin";
import formatNumber from "@utils/formatNumber";

import styles from "./CoinList.module.scss";

/** Пропсы, которые принимает компонент CoinList */
export type CoinListProps = {
  /** Информация о криптовалюте */
  coin: Coin | null;
};

const CoinList: React.FC<CoinListProps> = ({ coin }: CoinListProps) => {
  return (
    <ul className={styles.coinList}>
      <li className={styles.coinList__item}>
        <div>Market Cap</div>
        <div>${formatNumber(Number(coin?.market_cap))}</div>
      </li>
      <li className={styles.coinList__item}>
        <div>Fully Diluted Valuation</div>
        <div>${formatNumber(Number(coin?.fully_diluted_valuation))}</div>
      </li>
      <li className={styles.coinList__item}>
        <div>Circulating Supply</div>
        <div>{formatNumber(Number(coin?.circulating_supply))}</div>
      </li>
      <li className={styles.coinList__item}>
        <div>Total Supply</div>
        <div>{formatNumber(Number(coin?.total_supply))}</div>
      </li>
      <li className={styles.coinList__item}>
        <div>Max Supply</div>
        <div>{formatNumber(Number(coin?.max_supply))}</div>
      </li>
    </ul>
  );
};

export default CoinList;
