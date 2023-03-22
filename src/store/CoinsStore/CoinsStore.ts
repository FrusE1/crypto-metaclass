import { ILocalStore } from "@hooks/useLocaleStore";
import {
  normalizeCoins,
  CoinsApi,
  CoinsModel,
  CoinsSearchApi,
} from "@store/models/coins";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import { ParsedQsType } from "@store/RootStore/QueryParamsStore";
import { Meta } from "@utils/meta";
import axios from "axios";
import { makeObservable, observable, action, computed, runInAction } from "mobx";
import * as qs from "qs";

type PrivateCoinsField = "_items" | "_loading";

/** Лимит получаемых значений о криптовалюте */
export const COINS_LIMIT = 10;

export default class CoinsStore implements ILocalStore {
  private _items: CollectionModel<string, CoinsModel, number> =
    getInitialCollectionModel();
  private _loading: Meta = Meta.initial;

  constructor() {
    makeObservable<CoinsStore, PrivateCoinsField>(this, {
      _items: observable.ref,
      _loading: observable,
      getCoins: action,
      items: computed,
      loading: computed,
      totalCount: computed,
    });
  }

  /** Вся полученная криптовалюта */
  get items(): CoinsModel[] {
    return linearizeCollection(this._items);
  }

  /** Количество полученной криптовалюты */
  get totalCount(): number {
    return this._items.totalCount;
  }

  /** Статус загрузки криптовалюты */
  get loading(): Meta {
    return this._loading;
  }

  async getCoins(params: qs.ParsedQs): Promise<void> {
    this._loading = Meta.loading;
    this._items = getInitialCollectionModel();

    // Не очень решение, но до дедлайна только так работало
    // Плюс с апи нужные данные не все приходят
    // Поэтому приходится лишние запросы делать
    try {
      const search = params.search !== "" ? params.search : null;

      const responseSearch = await axios.get<CoinsSearchApi>(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );

      const idCoinSearch: string[] = responseSearch.data.coins.map(
        (item) => item.id
      );

      const responseLength = await axios.get<CoinsApi[]>(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );

      const queryParams: ParsedQsType = {};

      for (let key in rootStore.query.params) {
        if (rootStore.query.getParam(key) !== "" || rootStore.query.getParam(key)) {
          queryParams[key] = rootStore.query.params[key]
        }
      }

      try {
        const response = await axios.get<CoinsApi[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              per_page: 10,
              page: params.page,
              ids: idCoinSearch.join(","),
            },
          }
        );

        const response = await axios.get<CoinsApi[]>(
          `/api/v3/coins/markets?vs_currency=usd&per_page=250&ids=${idCoinSearch.join(',')}${categoryQuery}`
        )

        const responseCoins = await axios.get<CoinsApi[]>(
          "/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              per_page: COINS_LIMIT,
              ids: idCoinSearch.join(","),
              ...queryParams
            },
          }
        );

        runInAction(() => {
          this._loading = Meta.success;
          this._items = normalizeCollection(
            response.data,
            (item) => item.id,
            normalizeCoins,
            idCoinSearch.length ? idCoinSearch.length : responseLength.data.length
          );
        })

      } catch {
        runInAction(() => {
          this._loading = Meta.error;
          this._items = getInitialCollectionModel();
        })
      }
    }

  destroy(): void {}
  }
