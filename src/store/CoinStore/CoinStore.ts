import { ILocalStore } from "@hooks/useLocaleStore";
import {
  getInitialCoinModel,
  normalizeCoin,
  CoinApi,
  CoinModel,
} from "@store/models/coin";
<<<<<<< HEAD
=======
import rootStore from "@store/RootStore";
>>>>>>> 6499884 (hw-5)
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
<<<<<<< HEAD
      getCoin: action,
=======
      getCoin: action.bound,
>>>>>>> 6499884 (hw-5)
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

<<<<<<< HEAD
  async getCoin(id: string): Promise<void> {
=======
  async getCoin(): Promise<void> {
>>>>>>> 6499884 (hw-5)
    this._loading = Meta.loading;
    this._coin = getInitialCoinModel();

    try {
      const response = await axios.get<CoinApi>(
<<<<<<< HEAD
        `https://api.coingecko.com/api/v3/coins/${id}`
=======
        `https://api.coingecko.com/api/v3/coins/${rootStore.query.path}`
>>>>>>> 6499884 (hw-5)
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
