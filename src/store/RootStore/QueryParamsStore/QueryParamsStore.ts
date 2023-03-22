import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

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

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      params: computed,
    });
  }

  getParam(key: string): QsType {
    return this._params[key];
  }

  get params(): qs.ParsedQs {
    return this._params;
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
