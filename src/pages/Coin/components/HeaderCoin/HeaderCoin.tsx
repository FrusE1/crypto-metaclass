import React from "react";

import vector from "@assets/Vector.svg";
import { Coin } from "@pages/Coin/Coin";
import { useNavigate } from "react-router-dom";

import styles from "./HeaderCoin.module.scss";

/** Пропсы, которые принимает компонент HeaderCoin */
export type HeaderCoinProps = {
  /** Информация о криптовалюте */
  coin: Coin | null;
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
        src={vector}
        alt="vector"
      ></img>
      <img
        className={styles.headerCoin__img}
        src={coin?.image}
        alt={coin?.name}
      ></img>
      <div className={styles.headerCoin__name}>
        {coin?.name}
        <span>({coin?.symbol})</span>
      </div>
    </div>
  );
};

export default HeaderCoin;
