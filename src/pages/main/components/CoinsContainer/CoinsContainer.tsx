import React from "react";

import Pagination from "@components/Pagination";
import WithLoader from "@components/WithLoader";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinsStore from "@store/CoinsStore";
import rootStore from "@store/RootStore/instance";
import convertNumberToArray from "@utils/convertNumberToArray";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./CoinsContainer.module.scss";
import ListCoins from "../ListCoins";
import ErrorMessage from "@components/ErrorMessage";

/** Пропсы, которые принимает компонент CoinsContainer */
export type CoinsContainerProps = {
  /** Функция для изменения страницы */
  setPage: (page: number) => void;
};

const CoinsContainer: React.FC<CoinsContainerProps> = ({
  setPage,
}: CoinsContainerProps) => {
  const coinsStore = useLocalStore(() => new CoinsStore());

  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (number: number) => {
    setSearchParams({ ...rootStore.query.params, page: String(number) });
  };

  React.useEffect(() => {
    if (!rootStore.query.params.page) {
      setSearchParams({ page: "1", ...rootStore.query.params });
    } else {
      coinsStore.getCoins({
        ...rootStore.query.params,
        page: rootStore.query.params.page,
      });
    }
  }, [setPage]);



  return (
    <WithLoader loading={coinsStore.loading === Meta.loading}>
      {coinsStore.loading !== Meta.error ? (
        <>
          <ListCoins items={coinsStore.items} />
          <Pagination
            currentPage={Number(rootStore.query.params.page)}
            pages={convertNumberToArray(coinsStore.totalCount / COINS_LIMIT)}
            loadingPage={setPage}
          />
        </>
      ) : (
        <ErrorMessage />
      )}
    </WithLoader>
  );
};

export default observer(CoinsContainer);
