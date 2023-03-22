import { ILocalStore } from "@hooks/useLocaleStore";
import {
  getInitialCoinModel,
  normalizeCoin,
  CoinApi,
  CoinModel,
} from "@store/models/coin";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/meta";
import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
  IReactionDisposer,
  reaction,
} from "mobx";

type PrivateCoinsField = "_coin" | "_loading";

export default class CoinStore implements ILocalStore {
  private _coin: CoinModel = getInitialCoinModel();
  private _loading: Meta = Meta.initial;

  constructor() {
    makeObservable<CoinStore, PrivateCoinsField>(this, {
      _coin: observable.ref,
      _loading: observable,
      getCoin: action.bound,
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

  /** Получить информацию о криптовалюте */
  async getCoin(): Promise<void> {
    this._loading = Meta.loading;
    this._coin = getInitialCoinModel();

    try {
      const response = await axios.get<CoinApi>(
        `/api/v3/coins/${rootStore.query.path}`
      );

      if (!rootStore.query.path) {
        throw new Error();
      }

      runInAction(() => {
        this._loading = Meta.success;
        this._coin = normalizeCoin(response.data);
      });
    } catch {
      this._loading = Meta.error;
      this._coin = getInitialCoinModel();
    }
  }

  destroy(): void {
    this._pathReaction();
  }

  private readonly _pathReaction: IReactionDisposer = reaction(
    () => rootStore.query.path,
    () => this.getCoin()
  );
}
