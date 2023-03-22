import { Meta } from "@utils/meta";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateField = "_loading";

export type Result<T> = {
  data: T | null,
  success: boolean
}

export default class ApiStore {
  private _loading: Meta = Meta.initial;
  readonly baseURL: string;

  constructor(
    /** Базовый url адрес */
    baseURL: string
  ) {
    makeObservable<ApiStore, PrivateField>(this, {
      _loading: observable,
      request: action.bound,
    });
    this.baseURL = baseURL;
  }

  get loading(): Meta {
    return this._loading;
  }

  async request<T>(
    /** Конфиг запроса */
    config: AxiosRequestConfig<any> | undefined,
    /** Начальные значения при ошибке загрузки */
    initialData: T,
  ): Promise<Result<T>> {
    try {
      const response = await axios<T>({
        baseURL: this.baseURL,
        ...config
      });
      return { data: response.data, success: true };
    } catch {
      return { data: initialData, success: false };
    }
  }
}
