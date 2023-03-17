import { ILocalStore } from "@hooks/useLocaleStore";
import ApiStore from "@store/ApiStore";
import {
  getInitialCoinModel,
  normalizeCoin,
  CoinApi,
  CoinModel,
} from "@store/models/coin";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/meta";
import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateCoinsField = "_coin" | "_loading";

const BASE_URL = "https://api.coingecko.com";

export default class CoinStore implements ILocalStore {
  private _coin: CoinModel = getInitialCoinModel();
  private _loading: Meta = Meta.initial;
  // private readonly _apiStore = new ApiStore(BASE_URL);

  constructor() {
    makeObservable<CoinStore, PrivateCoinsField>(this, {
      _coin: observable.ref,
      _loading: observable,
      getCoin: action.bound,
      coin: computed,
      loading: computed,
    });
  }

  get coin(): CoinModel {
    return this._coin;
  }

  get loading(): Meta {
    return this._loading;
  }

  async getCoin(): Promise<void> {
    console.log("Coin axios");
    this._loading = Meta.loading;
    this._coin = getInitialCoinModel();

    try {
      const response = await axios.get<CoinApi>(
        `https://api.coingecko.com/api/v3/coins/${rootStore.query.path}`
      );

      this._loading = Meta.success;
      this._coin = normalizeCoin(response.data);
    } catch {
      this._loading = Meta.error;
      this._coin = getInitialCoinModel();
    }
  }

  destroy(): void { }
}
