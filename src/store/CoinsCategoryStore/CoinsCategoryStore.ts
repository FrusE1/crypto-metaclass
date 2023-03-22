import { ILocalStore } from "@hooks/useLocaleStore";
import {
  CoinsCategoryApi,
  CoinsCategoryModel,
  normalizeCoinsCategory,
} from "@store/models/coinsCategory";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import { QsType } from "@store/RootStore/QueryParamsStore";
import { Meta } from "@utils/meta";
import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateCoinsField = "_coinsCategory" | "_loading" | "_currentCategory";

export default class CoinsCategoryStore implements ILocalStore {
  private _coinsCategory: CollectionModel<string, CoinsCategoryModel, number> =
    getInitialCollectionModel();
  private _loading: Meta = Meta.initial;

  private _currentCategory: string | null = "";

  constructor() {
    makeObservable<CoinsCategoryStore, PrivateCoinsField>(this, {
      _coinsCategory: observable.ref,
      _loading: observable,
<<<<<<< HEAD
<<<<<<< HEAD
      getCoinsCategory: action,
=======
      getCoinsCategory: action.bound,
>>>>>>> 6499884 (hw-5)
=======
      _currentCategory: observable,
      getCoinsCategory: action.bound,
      setCategory: action.bound,
>>>>>>> cecd3c0 (Добавлена фильтрация по категориям)
      coinsCategory: computed,
      loading: computed,
    });
  }

  get coinsCategory(): CoinsCategoryModel[] {
    return linearizeCollection(this._coinsCategory);
  }

  get loading(): Meta {
    return this._loading;
  }

  get currentCategory(): string | null {
    return this._currentCategory;
  }

  setCategory(value: string | null) {
    this._currentCategory = value;
  }

  async getCoinsCategory(): Promise<void> {
    this._loading = Meta.loading;
    this._coinsCategory = getInitialCollectionModel();

    try {
      const response = await axios.get<CoinsCategoryApi[]>(
        "https://api.coingecko.com/api/v3/coins/categories/list"
      );

      this._loading = Meta.success;
      this._coinsCategory = normalizeCollection(
        response.data,
        (item) => item.id,
        normalizeCoinsCategory,
        response.data.length
      );
    } catch {
      this._loading = Meta.error;
      this._coinsCategory = getInitialCollectionModel();
    }
  }

  destroy(): void { }
}
