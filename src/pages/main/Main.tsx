import React from "react";

import CoinsContainer from "./components/CoinsContainer";
import Filter from "./components/Filter";
import Search from "./components/Search";
import Select from "./components/Select";
import styles from "./Main.module.scss";

const filterCategory: Array<string> = ["All", "Gainer", "Loser", "Favourites"];

const Main = () => {
  const [currentFilter, setCurrentFilter] = React.useState<string>("Gainer");

  return (
    <div className={styles.main}>
      <Search />
      <Select />
      <Filter
        values={filterCategory}
        currentValue={currentFilter}
        name="coins"
        onChange={setCurrentFilter}
      />
      <CoinsContainer />
    </div>
  );
};

export default Main;
