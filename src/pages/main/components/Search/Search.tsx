import React from "react";

import searchSvg from "@assets/search.svg";
import Button from "@components/Button";
import Input from "@components/Input";
import rootStore from "@store/RootStore";
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

/** Пропсы, которые принимает компонент Search */
export type SearchProps = {
  /** Функция для поиска */
  setSearch: (search: string) => void;
};

const Search: React.FC<SearchProps> = ({ setSearch }: SearchProps) => {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className={styles.search}>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Search Cryptocurrency"
      />
      <Button onClick={React.useCallback(() => setSearch(value), [value])}>
        <img className={styles.search__img} src={searchSvg} alt="search" />
      </Button>
    </div>
  );
};

export default React.memo(Search);
