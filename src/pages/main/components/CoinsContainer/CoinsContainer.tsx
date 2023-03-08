import React from "react";

import Pagination from "@components/Pagination";
import WithLoader from "@components/WithLoader";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinsStore from "@store/CoinsStore";
import rootStore from "@store/RootStore/instance";
import convertNumberToArray from "@utils/convertNumberToArray";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import ListCoins from "../ListCoins";

const CoinsContainer = () => {
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
  }, [coinsStore, rootStore.query.params]);

  return (
    <WithLoader loading={coinsStore.loading === Meta.loading}>
      <ListCoins items={coinsStore.items} />
      <Pagination
        currentPage={Number(rootStore.query.params.page)}
        pages={convertNumberToArray(
          coinsStore.totalCount / coinsStore.items.length
        )}
        loadingPage={setPage}
      />
    </WithLoader>
  );
};

export default observer(CoinsContainer);
