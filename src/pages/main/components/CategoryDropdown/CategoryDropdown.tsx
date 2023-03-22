import React from "react";

import MultiDropdown from "@components/MultiDropdown";
import { valueMultiDropdownType } from "@components/MultiDropdown/MultiDropdown";
import { useLocalStore } from "@hooks/useLocaleStore";
import CoinsCategoryStore from "@store/CoinsCategoryStore";
import { normalizeCoinsCategoryToOption } from "@store/models/coinsCategory";
import { observer } from "mobx-react-lite";

import styles from "./CategoryDropdown.module.scss";

/** Пропсы, которые принимает компонент CategoryDropdown */
export type CategoryDropdownProps = {
  /** Функция для изменения категории */
  setCategory: (category: valueMultiDropdownType) => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  setCategory,
}: CategoryDropdownProps) => {
  const coinsCategoryStore = useLocalStore(() => new CoinsCategoryStore());

  React.useEffect(() => {
    coinsCategoryStore.getCoinsCategory();
  }, [coinsCategoryStore]);

  const setCategoryValue = React.useCallback(
    (value: valueMultiDropdownType) => {
      setCategory(value);
      coinsCategoryStore.setCategory(value);
    },
    [setCategory, coinsCategoryStore]
  );

  return (
    <div className={styles.select}>
      <div className={styles.select__title}>Coins</div>
      <MultiDropdown
        value={coinsCategoryStore.currentCategory}
        options={normalizeCoinsCategoryToOption(
          coinsCategoryStore.coinsCategory
        )}
        onChange={setCategoryValue}
      />
    </div>
  );
};

export default observer(CategoryDropdown);
