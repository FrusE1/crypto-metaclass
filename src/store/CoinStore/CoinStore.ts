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
import { makeObservable, observable, action, computed, runInAction, IReactionDisposer, reaction } from "mobx";

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

  /** Информация о криптовалюте */
  get coin(): CoinModel {
    return this._coin;
  }

  /** Статус загрузки криптовалюты */
  get loading(): Meta {
    return this._loading;
  }

<<<<<<< HEAD
<<<<<<< HEAD
  async getCoin(id: string): Promise<void> {
=======
  async getCoin(): Promise<void> {
<<<<<<< HEAD
>>>>>>> 6499884 (hw-5)
=======
    console.log("Coin axios");
>>>>>>> cecd3c0 (Добавлена фильтрация по категориям)
=======
  /** Получить информацию о криптовалюте */
  async getCoin(): Promise<void> {
>>>>>>> 4eb6af3 (Добавлен график цены криптовалюты, а также исправлены некоторые моменты)
    this._loading = Meta.loading;
    this._coin = getInitialCoinModel();

    try {

      const response = await axios.get<CoinApi>(
<<<<<<< HEAD
<<<<<<< HEAD
        `https://api.coingecko.com/api/v3/coins/${id}`
=======
        `https://api.coingecko.com/api/v3/coins/${rootStore.query.path}`
>>>>>>> 6499884 (hw-5)
=======
        `/api/v3/coins/${rootStore.query.path}`
>>>>>>> 4eb6af3 (Добавлен график цены криптовалюты, а также исправлены некоторые моменты)
      );

      if (!rootStore.query.path) {
        throw new Error();
      }

      runInAction(() => {
        this._loading = Meta.success;
        this._coin = normalizeCoin(response.data);
      })

    } catch {
      this._loading = Meta.error;
      this._coin = getInitialCoinModel();
    }
  }

  destroy(): void {
    this._pathReaction()
  }

  private readonly _pathReaction: IReactionDisposer = reaction(
    () => rootStore.query.path,
    () => this.getCoin()
  )
}
