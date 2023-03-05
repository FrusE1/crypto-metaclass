import { ILocalStore } from "@hooks/useLocaleStore";
import {
  getInitialCoinModel,
  normalizeCoin,
  CoinApi,
  CoinModel,
} from "@store/models/coin";
import { Meta } from "@utils/meta";
import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateCoinsField = "_coin" | "_loading";

export default class CoinStore implements ILocalStore {
  private _coin: CoinModel = getInitialCoinModel();
  private _loading: Meta = Meta.initial;

  constructor() {
    makeObservable<CoinStore, PrivateCoinsField>(this, {
      _coin: observable.ref,
      _loading: observable,
      getCoin: action,
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

  async getCoin(id: string): Promise<void> {
    this._loading = Meta.loading;
    this._coin = getInitialCoinModel();

    try {
      const response = await axios.get<CoinApi>(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );

      this._loading = Meta.success;
      this._coin = normalizeCoin(response.data);
    } catch {
      this._loading = Meta.error;
      this._coin = getInitialCoinModel();
    }
  }

  destroy(): void {}
}
