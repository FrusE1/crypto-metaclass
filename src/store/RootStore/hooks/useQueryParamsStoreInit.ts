import React from "react";

import * as Router from "react-router-dom";

import rootStore from "../instance";

/** Хук следящий за изменением query параметров */
export const useQueryParamsStoreInit = (): void => {
  const { search, pathname } = Router.useLocation();

  React.useEffect(() => {
    rootStore.query.setSearch(search);
    rootStore.query.setPath(pathname);
  }, [search, pathname]);
};
