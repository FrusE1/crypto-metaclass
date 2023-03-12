import React from "react";

import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinsCategoryStore from "@store/CoinsCategoryStore";
import { normalizeCoinsCategoryToOption } from "@store/models/coinsCategory";
import { observer } from "mobx-react-lite";

import styles from "./Select.module.scss";

const Select = () => {
  const defaultPluralizeOptions = (elements: Option[]) =>
    elements.map((el: Option) => el.key).join();

  const [categoriesSelect, setCategoriesSelect] = React.useState<Option[]>([]);

  const coinsCategoryStore = useLocalStore(() => new CoinsCategoryStore());

  React.useEffect(() => {
    coinsCategoryStore.getCoinsCategory();
  }, [coinsCategoryStore]);

  return (
    <div className={styles.select}>
      <div className={styles.select__title}>Coins</div>
      <MultiDropdown
        value={categoriesSelect}
        options={normalizeCoinsCategoryToOption(
          coinsCategoryStore.coinsCategory
        )}
        onChange={setCategoriesSelect}
        pluralizeOptions={defaultPluralizeOptions}
      />
    </div>
  );
};

export default observer(Select);
