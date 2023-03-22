import React from "react";

import searchSvg from "@assets/search.svg";
import Button from "@components/Button";
import Input from "@components/Input";
<<<<<<< HEAD
<<<<<<< HEAD
import rootStore from "@store/RootStore/instance";
=======
import rootStore from "@store/RootStore";
>>>>>>> 6499884 (hw-5)
import { useSearchParams } from "react-router-dom";
=======
>>>>>>> 4eb6af3 (Добавлен график цены криптовалюты, а также исправлены некоторые моменты)

import styles from "./Search.module.scss";

/** Пропсы, которые принимает компонент Search */
export type SearchProps = {
  /** Функция для поиска */
  setSearch: (search: string) => void;
};

const Search: React.FC<SearchProps> = ({ setSearch }: SearchProps) => {
  const [value, setValue] = React.useState<string>("");

<<<<<<< HEAD
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

=======
>>>>>>> cecd3c0 (Добавлена фильтрация по категориям)
  return (
    <div className={styles.search}>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Search Cryptocurrency"
      />
      <Button
        onClick={React.useCallback(() => setSearch(value), [setSearch, value])}
      >
        <img className={styles.search__img} src={searchSvg} alt="search" />
      </Button>
    </div>
  );
};

export default React.memo(Search);
