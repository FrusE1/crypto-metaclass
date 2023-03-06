import React from "react";

import Card from "@components/Card";
import Pagination from "@components/Pagination";
import WithLoader from "@components/WithLoader";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinsStore from "@store/CoinsStore";
import rootStore from "@store/RootStore/instance";
import convertNumberToArray from "@utils/convertNumberToArray";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./ListCoins.module.scss";
import Price from "../Price";

const ListCoins = () => {
  const coinsStore = useLocalStore(() => new CoinsStore());

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const setPage = (number: number) => {
    setSearchParams({ ...rootStore.query.params, page: String(number) });
  };

  React.useEffect(() => {
    coinsStore.getCoins({
      ...rootStore.query.params,
      page:
        coinsStore.totalCount / coinsStore.items.length >
        Number(rootStore.query.params.page)
          ? "1"
          : rootStore.query.params.page,
    });
  }, [coinsStore, rootStore.query.params]);

  React.useEffect(() => {
    setSearchParams({ ...rootStore.query.params, page: "1" });
  }, []);

  const goToPage = (id: string): void => {
    navigate(`/coins/${id}`);
  };

  return (
    <WithLoader loading={coinsStore.loading === Meta.loading}>
      <div className={styles.listCoins}>
        {coinsStore.items.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <Card
                image={item.image}
                title={item.name}
                subtitle={item.symbol}
                content={
                  <Price
                    price={item.currentPrice}
                    percentage={item.priceChangePercentage}
                  />
                }
                onClick={() => goToPage(item.id)}
              />
            </React.Fragment>
          );
        })}
      </div>
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

export default observer(ListCoins);
