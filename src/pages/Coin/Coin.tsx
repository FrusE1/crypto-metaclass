import React from "react";

import WithLoader from "@components/WithLoader";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinStore from "@store/CoinStore";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
>>>>>>> 6499884 (hw-5)

import styles from "./Coin.module.scss";
import CoinChart from "./components/CoinChart";
import CoinDescription from "./components/CoinDescription";
import CoinList from "./components/CoinList";
import CoinPrice from "./components/CoinPrice";
import HeaderCoin from "./components/HeaderCoin/HeaderCoin";
import CoinChartStore from "@store/CoinChartStore";
import ErrorMessage from "@components/ErrorMessage";
import rootStore from "@store/RootStore/instance";

<<<<<<< HEAD
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
=======
const Coin = () => {
>>>>>>> cecd3c0 (Добавлена фильтрация по категориям)
  const coinStore = useLocalStore(() => new CoinStore());
  const coinChartStore = useLocalStore(() => new CoinChartStore());

  React.useEffect(() => {
<<<<<<< HEAD
    coinStore.getCoin();
<<<<<<< HEAD
  }, [coinStore]);
>>>>>>> 6499884 (hw-5)
=======
  }, []);

  React.useEffect(() => {
    if (coinStore.loading === Meta.error) {
      navigate("/error")
    }
  }, [])
>>>>>>> cecd3c0 (Добавлена фильтрация по категориям)
=======
    coinChartStore.getPricesChart();
  }, [coinChartStore.days, rootStore.query.path])
>>>>>>> 4eb6af3 (Добавлен график цены криптовалюты, а также исправлены некоторые моменты)

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
