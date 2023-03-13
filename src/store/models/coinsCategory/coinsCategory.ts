import { Option } from "@components/MultiDropdown/MultiDropdown";

export type CoinsCategoryApi = {
  category_id: string;
  name: string;
};

export type CoinsCategoryModel = {
  id: string;
  name: string;
};

export const normalizeCoinsCategory = (
  from: CoinsCategoryApi
): CoinsCategoryModel => ({
  id: from.category_id,
  name: from.name,
});

export const normalizeCoinsCategoryToOption = (
  from: CoinsCategoryModel[]
): Option[] => from.map((item) => ({ key: item.id, value: item.name }));
