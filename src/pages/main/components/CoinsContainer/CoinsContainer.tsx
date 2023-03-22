import React from "react";

import ErrorMessage from "@components/ErrorMessage";
import Pagination from "@components/Pagination";
import WithLoader from "@components/WithLoader";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinsStore from "@store/CoinsStore";
import { COINS_LIMIT } from "@store/CoinsStore/CoinsStore";
import rootStore from "@store/RootStore";
import convertNumberToArray from "@utils/convertNumberToArray";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";

import ListCoins from "../ListCoins";

/** Пропсы, которые принимает компонент CoinsContainer */
export type CoinsContainerProps = {
  /** Функция для изменения страницы */
  setPage: (page: number) => void;
};

const CoinsContainer: React.FC<CoinsContainerProps> = ({
  setPage,
}: CoinsContainerProps) => {
  const coinsStore = useLocalStore(() => new CoinsStore());

  React.useEffect(() => {
    coinsStore.getCoins();
  }, [coinsStore, rootStore.query.params]);

  React.useEffect(() => {
    if (!rootStore.query.getParam("page")) {
      setPage(1);
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
