import rootStore from "@store/RootStore";
import React from "react";
import { useSearchParams } from "react-router-dom";

import CoinsContainer from "./components/CoinsContainer";
import Filter from "./components/Filter";
import Search from "./components/Search";
import CategoryDropdown from "./components/CategoryDropdown";
import styles from "./Main.module.scss";
import { valueMultiDropdownType } from "@components/MultiDropdown/MultiDropdown";

const FILTER_CATEGORY: Array<string> = ["All", "Gainer", "Loser", "Favourites"];

const Main = () => {
  const [currentFilter, setCurrentFilter] = React.useState<string>("Gainer");

  const [queryParams, setQueryParams] = useSearchParams();

  const setPage = React.useCallback((number: number) => {
    setQueryParams({ ...rootStore.query.params, page: String(number) });
  }, [rootStore.query.params]);

  const setSearch = React.useCallback((search: string) =>
    setQueryParams({ ...rootStore.query.params, search, page: "1" })
    , [rootStore.query.params]);

  const setCategory = React.useCallback((category: valueMultiDropdownType) => {
    setQueryParams({
      ...rootStore.query.params,
      category: category ? category : "",
      page: "1"
    })
  }, [rootStore.query.params]);

  const setFilter = React.useCallback((value: string) => setCurrentFilter(value), []);

  return (
    <div className={styles.main}>
      <Search setSearch={setSearch} />
      <CategoryDropdown setCategory={setCategory} />
      <Filter
        values={FILTER_CATEGORY}
        currentValue={currentFilter}
        name="coins"
        onChange={setFilter}
      />
      <CoinsContainer setPage={setPage} />
    </div>
  );
};

export default Main;
