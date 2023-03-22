import { Meta } from "@utils/meta";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateField = "_loading";

// Нигде этот стор не использую, т.к не закончен
// Возможно до проверки успею до ума довести
// Оставил здесь на всякий случай, вдруг получу
// какую-нибудь подсказку
export default class ApiStore {
  private _loading: Meta = Meta.initial;
  readonly baseURL: string;

  constructor(baseURL: string) {
    makeObservable<ApiStore, PrivateField>(this, {
      _loading: observable,
      request: action.bound,
    });
    this.baseURL = baseURL;
  }

  get loading(): Meta {
    return this._loading;
  }

  request(
    config: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> {
    this._loading = Meta.loading;
    let response = axios(this.baseURL, config);
    return response;
  }
}
