import React from "react";

import { useLocalStore } from "@hooks/useLocaleStore";
import CoinStore from "@store/CoinStore";
import { observer } from "mobx-react-lite";

import styles from "./Coin.module.scss";
import CoinDescription from "./components/CoinDescription";
import CoinList from "./components/CoinList";
import CoinPrice from "./components/CoinPrice";
import HeaderCoin from "./components/HeaderCoin/HeaderCoin";
import WithLoader from "@components/WithLoader";
import { Meta } from "@utils/meta";
import { useNavigate } from "react-router-dom";
import rootStore from "@store/RootStore";

const Coin = () => {
  const coinStore = useLocalStore(() => new CoinStore());
  const navigate = useNavigate();

  console.log("Render Coin", coinStore.coin, coinStore.loading);
  console.log("Query", rootStore.query)

  React.useEffect(() => {
    coinStore.getCoin();
  }, []);

  React.useEffect(() => {
    if (coinStore.loading === Meta.error) {
      navigate("/error")
    }
  }, [])

  return (
    <div className={styles.coin}>
      <HeaderCoin coin={coinStore.coin} />
      <WithLoader loading={coinStore.loading === Meta.loading}>
        <CoinPrice coin={coinStore.coin} />
        <CoinList coin={coinStore.coin} />
        <CoinDescription description={coinStore.coin.description.en} />
      </WithLoader>
    </div>
  );
};

export default observer(Coin);
