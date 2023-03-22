import React from "react";

import WithLoader from "@components/WithLoader";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinStore from "@store/CoinStore";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";

import styles from "./Coin.module.scss";
import CoinChart from "./components/CoinChart";
import CoinDescription from "./components/CoinDescription";
import CoinList from "./components/CoinList";
import CoinPrice from "./components/CoinPrice";
import HeaderCoin from "./components/HeaderCoin/HeaderCoin";
import CoinChartStore from "@store/CoinChartStore";
import ErrorMessage from "@components/ErrorMessage";
import rootStore from "@store/RootStore/instance";

const Coin = () => {
  const coinStore = useLocalStore(() => new CoinStore());
  const coinChartStore = useLocalStore(() => new CoinChartStore());

  React.useEffect(() => {
    coinChartStore.getPricesChart();
  }, [coinChartStore.days, rootStore.query.path])

  return (
    <WithLoader loading={coinStore.loading === Meta.loading}>
      {
        coinStore.loading !== Meta.error
          ? <div className={styles.coinContainer}>
            <div className={styles.coin}>
              <HeaderCoin coin={coinStore.coin} />
              <CoinPrice coin={coinStore.coin} />
              <CoinList coin={coinStore.coin} />
              <CoinDescription description={coinStore.coin.description.en} />
            </div>
            <CoinChart prices={coinChartStore.chartData} days={coinChartStore.days} setCurrentDays={coinChartStore.setDays} />
          </div>
          : <ErrorMessage />
      }
    </WithLoader>
  );
};

export default observer(Coin);
