import { ILocalStore } from "@hooks/useLocaleStore";
import {
  CoinChartApi,
  CoinChartModel,
  getInitialCoinChart,
  normalizeCoinChart,
} from "@store/models/coinChart";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/meta";
import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

type PrivateCoinsField = "_chartData" | "_loading" | "_days";

export default class CoinChartStore implements ILocalStore {
  private _chartData: CoinChartModel = getInitialCoinChart();
  private _loading: Meta = Meta.initial;
  private _days: string = "0.5";

  constructor() {
    makeObservable<CoinChartStore, PrivateCoinsField>(this, {
      _chartData: observable.ref,
      _loading: observable,
      _days: observable,
      loading: computed,
      chartData: computed,
      days: computed,
      getPricesChart: action.bound,
      setDays: action.bound,
    });
  }

  /** Статус загрузки данных диаграммы цен валюты */
  get loading(): Meta {
    return this._loading;
  }

  /** Данные о диаграмме цены валюты */
  get chartData(): CoinChartModel {
    return this._chartData;
  }

  /** Текущее значение диапазона времени цен криптовалюты */
  get days(): string {
    return this._days;
  }

  /** Установать значение диапазона времени цен криптовалюты */
  setDays(days: string) {
    this._days = days;
  }

  /** Запрос на получение данных о диаграмме цены валюты */
  async getPricesChart(): Promise<void> {
    this._loading = Meta.loading;
    this._chartData = getInitialCoinChart();

    try {
      if (!rootStore.query.path) {
        throw new Error();
      }

      const response = await axios.get<CoinChartApi>(
        `api/v3/coins/${rootStore.query.path}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: this.days,
          },
        }
      );

      runInAction(() => {
        this._loading = Meta.success;
        this._chartData = normalizeCoinChart(response.data);
      });
    } catch {
      this._loading = Meta.error;
      this._chartData = getInitialCoinChart();
    }
  }

  destroy(): void {}
}
