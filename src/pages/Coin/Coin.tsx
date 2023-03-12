import React from "react";

import { useLocalStore } from "@hooks/useLocaleStore";
import CoinStore from "@store/CoinStore";
import { observer } from "mobx-react-lite";

import styles from "./Coin.module.scss";
import CoinDescription from "./components/CoinDescription";
import CoinList from "./components/CoinList";
import CoinPrice from "./components/CoinPrice";
import HeaderCoin from "./components/HeaderCoin/HeaderCoin";

const CoinInfo = () => {
  const coinStore = useLocalStore(() => new CoinStore());

  React.useEffect(() => {
    coinStore.getCoin();
  }, [coinStore]);

  return (
    <div className={styles.coin}>
      <HeaderCoin coin={coinStore.coin} />
      <CoinPrice coin={coinStore.coin} />
      <CoinList coin={coinStore.coin} />
      <CoinDescription description={coinStore.coin.description.en} />
    </div>
  );
};

export default observer(CoinInfo);
