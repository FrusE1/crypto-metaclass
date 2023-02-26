import React from "react";

import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import axios from "axios";

import styles from "./Select.module.scss";

export interface ResponseApi {
  status: string;
  data: Array<Record<string, string>>;
}

const Select = () => {
  const defaultPluralizeOptions = (elements: Option[]) =>
    elements.map((el: Option) => el.key).join();

  const [categories, setCategories] = React.useState<Option[]>([]);

  async function getCategories() {
    let categories: ResponseApi = await axios.get(
      "https://api.coingecko.com/api/v3/coins/categories/list"
    );
    setCategories(
      categories.data.map((item) => ({
        key: item.category_id,
        value: item.name,
      }))
    );
  }

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.select}>
      <div className={styles.select__title}>Coins</div>
      <MultiDropdown
        onChange={() => {}}
        value={[]}
        options={categories}
        pluralizeOptions={defaultPluralizeOptions}
      ></MultiDropdown>
    </div>
  );
};

export default Select;
