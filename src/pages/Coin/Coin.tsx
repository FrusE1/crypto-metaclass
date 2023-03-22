import React from "react";

import { useLocalStore } from "@hooks/useLocaleStore";
import CoinStore from "@store/CoinStore";
import { observer } from "mobx-react-lite";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
>>>>>>> 6499884 (hw-5)

import styles from "./Coin.module.scss";
import CoinDescription from "./components/CoinDescription";
import CoinList from "./components/CoinList";
import CoinPrice from "./components/CoinPrice";
import HeaderCoin from "./components/HeaderCoin/HeaderCoin";

const CoinInfo = () => {
<<<<<<< HEAD
  const { id } = useParams();
  const coinStore = useLocalStore(() => new CoinStore());

  React.useEffect(() => {
    if (id) {
      coinStore.getCoin(id);
    }
  }, [id, coinStore]);
=======
  const coinStore = useLocalStore(() => new CoinStore());

  React.useEffect(() => {
    coinStore.getCoin();
  }, [coinStore]);
>>>>>>> 6499884 (hw-5)

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
