import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params" | "_path" | "_search";

export type QsType =
  | undefined
  | string
  | string[]
  | qs.ParsedQs
  | qs.ParsedQs[];

export type ParsedQsType = qs.ParsedQs;

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  private _path: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      _path: observable,
      _search: observable,
      setSearch: action.bound,
      setPath: action.bound,
      params: computed,
      path: computed,
    });
  }

  /** Получить данные о конкретном query параметре */
  getParam(
    /** Ключ параметра */
    key: string
  ): QsType {
    return this._params[key];
  }

  /** Все query параметры */
  get params(): qs.ParsedQs {
    return this._params;
  }

  /** Путь в url */
  get path(): string {
    return this._path;
  }

  /** Установить query параметры */
  setSearch(
    /** Строка query параметров */
    search: string
  ) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  /** Установить путь */
  setPath(
    /** Путь в url */
    path: string
  ) {
    path = path.startsWith("/coin/") ? path.slice(6) : path;
    if (this._path !== path) {
      this._path = path;
    }
  }
}
