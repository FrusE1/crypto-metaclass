import React from "react";

import CoinsContainer from "./components/CoinsContainer";
import Filter from "./components/Filter";
import Search from "./components/Search";
import Select from "./components/Select";
import styles from "./Main.module.scss";

<<<<<<< HEAD
const filterCategory: Array<string> = ["All", "Gainer", "Loser", "Favourites"];
=======
const FILTER_CATEGORY: Array<string> = ["All", "Gainer", "Loser", "Favourites"];
>>>>>>> 6499884 (hw-5)

const Main = () => {
  const [currentFilter, setCurrentFilter] = React.useState<string>("Gainer");

  return (
    <div className={styles.main}>
      <Search />
      <Select />
      <Filter
<<<<<<< HEAD
        values={filterCategory}
=======
        values={FILTER_CATEGORY}
>>>>>>> 6499884 (hw-5)
        currentValue={currentFilter}
        name="coins"
        onChange={setCurrentFilter}
      />
      <CoinsContainer />
    </div>
  );
};

export default Main;
