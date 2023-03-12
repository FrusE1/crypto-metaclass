import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export type QSType =
  | undefined
  | string
  | string[]
  | qs.ParsedQs
  | qs.ParsedQs[];

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  private _path: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      params: computed,
      path: computed,
    });
  }

  getParam(key: string): QSType {
    return this._params[key];
  }

  get params(): qs.ParsedQs {
    return this._params;
  }

  get path(): string {
    return this._path;
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setPath(path: string) {
    path = path.startsWith("/") ? path.slice(1) : path;

    if (this._path !== path) {
      this._path = path;
    }
  }
}
