import React from "react";

import searchSvg from "@assets/search.svg";
import Button from "@components/Button";
import Input from "@components/Input";
<<<<<<< HEAD
import rootStore from "@store/RootStore/instance";
=======
import rootStore from "@store/RootStore";
>>>>>>> 6499884 (hw-5)
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = React.useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

<<<<<<< HEAD
  const setParams = (value: string) => {
    setSearchParams({ ...rootStore.query.params, search: value, page: "1" });
  };
=======
  const setParams = React.useCallback((value: string) => {
    setSearchParams({ ...rootStore.query.params, search: value, page: "1" });
  }, []);
>>>>>>> 6499884 (hw-5)

  return (
    <div className={styles.search}>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Search Cryptocurrency"
      />
      <Button onClick={() => setParams(value)}>
        <img className={styles.search__img} src={searchSvg} alt="search" />
      </Button>
    </div>
  );
};

export default React.memo(Search);
