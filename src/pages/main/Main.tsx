import React from "react";

import { valueMultiDropdownType } from "@components/MultiDropdown/MultiDropdown";
import rootStore from "@store/RootStore";
import { useSearchParams } from "react-router-dom";

import CategoryDropdown from "./components/CategoryDropdown";
import CoinsContainer from "./components/CoinsContainer";
import Filter from "./components/Filter";
import Search from "./components/Search";
import styles from "./Main.module.scss";

const FILTER_CATEGORY: Array<string> = ["All", "Gainer", "Loser", "Favourites"];

const Main = () => {
  const [currentFilter, setCurrentFilter] = React.useState<string>("Gainer");

  const [queryParams, setQueryParams] = useSearchParams();

  const setPage = React.useCallback(
    (number: number) => {
      setQueryParams({ ...rootStore.query.params, page: String(number) });
    },
    [rootStore.query.params, setQueryParams]
  );

  const setSearch = React.useCallback(
    (search: string) =>
      setQueryParams({ ...rootStore.query.params, search, page: "1" }),
    [rootStore.query.params, setQueryParams]
  );

  const setCategory = React.useCallback(
    (category: valueMultiDropdownType) => {
      setQueryParams({
        ...rootStore.query.params,
        category: category ? category : "",
        page: "1",
      });
    },
    [rootStore.query.params, setQueryParams]
  );

  const setFilter = React.useCallback(
    (value: string) => setCurrentFilter(value),
    []
  );

  return (
    <div className={styles.main}>
      <Search setSearch={setSearch} />
      <CategoryDropdown setCategory={setCategory} />
      {/* <Filter
        values={FILTER_CATEGORY}
        currentValue={currentFilter}
        name="coins"
        onChange={setFilter}
      /> */}
      <CoinsContainer setPage={setPage} />
    </div>
  );
};

export default React.memo(Main);
