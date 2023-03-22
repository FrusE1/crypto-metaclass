import React from "react";

import Coin from "@pages/Coin";
import Error from "@pages/Error";
import Main from "@pages/main";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";

function App() {
  useQueryParamsStoreInit();

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Coin />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
