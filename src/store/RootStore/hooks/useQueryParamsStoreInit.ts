<<<<<<< HEAD
=======
import React from "react";

>>>>>>> 6499884 (hw-5)
import * as Router from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
<<<<<<< HEAD
  const { search } = Router.useLocation();
  rootStore.query.setSearch(search);
=======
  const { search, pathname } = Router.useLocation();

  React.useEffect(() => {
    rootStore.query.setSearch(search);
    rootStore.query.setPath(pathname);
  }, [search, pathname]);
>>>>>>> 6499884 (hw-5)
};
