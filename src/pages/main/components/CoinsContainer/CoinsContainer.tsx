import React from "react";

import Pagination from "@components/Pagination";
import WithLoader from "@components/WithLoader";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinsStore from "@store/CoinsStore";
import rootStore from "@store/RootStore";
import convertNumberToArray from "@utils/convertNumberToArray";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./CoinsContainer.module.scss";

import ListCoins from "../ListCoins";
import { COINS_LIMIT } from "@store/CoinsStore/CoinsStore";

/** Пропсы, которые принимает компонент CoinsContainer */
export type CoinsContainerProps = {
  /** Функция для изменения страницы */
  setPage: (page: number) => void;
};

const CoinsContainer: React.FC<CoinsContainerProps> = ({ setPage }: CoinsContainerProps) => {
  const coinsStore = useLocalStore(() => new CoinsStore());

  React.useEffect(() => {
    coinsStore.getCoins();
  }, [coinsStore, rootStore.query.params]);

  React.useEffect(() => {
    if (!rootStore.query.params.page) {
      setPage(1);
    }
  }, [])

  return (
    <WithLoader loading={coinsStore.loading === Meta.loading}>
      {coinsStore.items.length
        ? <>
          <ListCoins items={coinsStore.items} />
          <Pagination
            currentPage={Number(rootStore.query.params.page)}
            pages={convertNumberToArray(
              coinsStore.totalCount / COINS_LIMIT
            )}
            loadingPage={setPage}
          />
        </>
        : <div className={styles.error}>
          Data not found. <Link to="/" className={styles.error_link}>Go to main page</Link>
        </div>
      }
    </WithLoader>
  );
};

export default observer(CoinsContainer);
