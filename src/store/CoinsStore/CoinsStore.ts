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
import { Meta } from "@utils/meta";
import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateCoinsField = "_items" | "_loading";

export default class CoinsStore implements ILocalStore {
  private _items: CollectionModel<string, CoinsModel, number> =
    getInitialCollectionModel();
  private _loading: Meta = Meta.initial;

  constructor() {
    makeObservable<CoinsStore, PrivateCoinsField>(this, {
      _items: observable.ref,
      _loading: observable,
      getCoins: action.bound,
      items: computed,
      loading: computed,
      totalCount: computed,
    });
  }

  get items(): CoinsModel[] {
    return linearizeCollection(this._items);
  }

  get totalCount(): number {
    return this._items.totalCount;
  }

  get loading(): Meta {
    return this._loading;
  }

  async getCoins(): Promise<void> {
    this._loading = Meta.loading;
    this._items = getInitialCollectionModel();

    try {
      const search = rootStore.query.getParam("search")
        ? `?query=${rootStore.query.getParam("search")}`
        : null;

      let idCoinSearch: string[] = [];
      if (search) {
        const responseSearch = await axios.get<CoinsSearchApi>(
          `https://api.coingecko.com/api/v3/search${search}`
        );
        idCoinSearch = responseSearch.data.coins.map((item) => item.id);
      }

      const response = await axios.get<CoinsApi[]>(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );

      try {
        const responseCoins = await axios.get<CoinsApi[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              per_page: 10,
              page: rootStore.query.getParam("page"),
              ids: idCoinSearch.join(","),
            },
          }
        );

        this._loading = Meta.success;
        this._items = normalizeCollection(
          responseCoins.data,
          (item) => item.id,
          normalizeCoins,
          idCoinSearch.length ? idCoinSearch.length : response.data.length
        );
      } catch {
        this._loading = Meta.error;
        this._items = getInitialCollectionModel();
      }
    } catch {
      this._loading = Meta.error;
      this._items = getInitialCollectionModel();
    }
  }

  destroy(): void {}
}
