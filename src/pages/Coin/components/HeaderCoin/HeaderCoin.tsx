import React from "react";

import arrow from "@assets/arrow.svg";
import { CoinModel } from "@store/models/coin";
import { useNavigate } from "react-router-dom";

import styles from "./HeaderCoin.module.scss";

/** Пропсы, которые принимает компонент HeaderCoin */
export type HeaderCoinProps = {
  /** Информация о криптовалюте */
  coin: CoinModel;
};

const HeaderCoin: React.FC<HeaderCoinProps> = ({ coin }: HeaderCoinProps) => {
  const navigate = useNavigate();
  const goToPageMain = (): void => {
    navigate("/");
  };

  return (
    <div className={styles.headerCoin}>
      <img
        className={styles.headerCoin__vector}
        onClick={() => goToPageMain()}
        src={arrow}
        alt="coin arrow"
      />
      <img
        className={styles.headerCoin__img}
        src={coin.image.thumb}
        alt={coin.name}
      />
      <div className={styles.headerCoin__name}>
        {coin.name}
        <span>({coin.symbol})</span>
      </div>
    </div>
  );
};

export default HeaderCoin;
