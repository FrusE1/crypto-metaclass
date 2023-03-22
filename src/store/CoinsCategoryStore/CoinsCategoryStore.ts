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
import { Meta } from "@utils/meta";
import axios from "axios";
import { makeObservable, observable, action, computed, runInAction } from "mobx";

type PrivateCoinsField = "_coinsCategory" | "_loading" | "_currentCategory";

export default class CoinsCategoryStore implements ILocalStore {
  private _coinsCategory: CollectionModel<string, CoinsCategoryModel, number> =
    getInitialCollectionModel();
  private _loading: Meta = Meta.initial;

  private _currentCategory: string | null = null;

  constructor() {
    makeObservable<CoinsCategoryStore, PrivateCoinsField>(this, {
      _coinsCategory: observable.ref,
      _loading: observable,
      _currentCategory: observable,
      getCoinsCategory: action.bound,
      setCategory: action.bound,
      coinsCategory: computed,
      loading: computed,
    });
  }

  /** Все категории валюты */
  get coinsCategory(): CoinsCategoryModel[] {
    return linearizeCollection(this._coinsCategory);
  }

  /** Статус загрузки категорий валюты */
  get loading(): Meta {
    return this._loading;
  }

  /** Текущая выбранная категория валюты */
  get currentCategory(): string | null {
    return this._currentCategory;
  }

  /** Выбрать категорию валюты */
  setCategory(
    /** Выбраемая категория (может быть пустой) */
    value: string | null
  ) {
    this._currentCategory = value;
  }

  /** Получить все категории валюты */
  async getCoinsCategory(): Promise<void> {
    this._loading = Meta.loading;
    this._coinsCategory = getInitialCollectionModel();

    try {
      const response = await axios.get<CoinsCategoryApi[]>(
        "/api/v3/coins/categories/list"
      );

      runInAction(() => {
        this._loading = Meta.success;
        this._coinsCategory = normalizeCollection(
          response.data,
          (item) => item.id,
          normalizeCoinsCategory,
          response.data.length
        );
      })
    } catch {
      this._loading = Meta.error;
      this._coinsCategory = getInitialCollectionModel();
    }
  }

  destroy(): void { }
}
