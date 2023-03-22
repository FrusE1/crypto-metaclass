import React from "react";

import { valueMultiDropdownType } from "@components/MultiDropdown/MultiDropdown";
import rootStore from "@store/RootStore";
import { useSearchParams } from "react-router-dom";

import CategoryDropdown from "./components/CategoryDropdown";
import CoinsContainer from "./components/CoinsContainer";
import Search from "./components/Search";
import styles from "./Main.module.scss";

const Main = () => {
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

  return (
    <div className={styles.main}>
      <Search setSearch={setSearch} />
      <CategoryDropdown setCategory={setCategory} />
      <CoinsContainer setPage={setPage} />
    </div>
  );
};

export default React.memo(Main);
