import React from "react";

import searchSvg from "@assets/search.svg";
import Button from "@components/Button";
import Input from "@components/Input";

import styles from "./Search.module.scss";

const Header = () => {
  return (
    <div className={styles.search}>
      <Input placeholder="Search Cryptocurrency" />
      <Button>
        <img className={styles.search__img} src={searchSvg} alt="search"></img>
      </Button>
    </div>
  );
};

export default Header;
