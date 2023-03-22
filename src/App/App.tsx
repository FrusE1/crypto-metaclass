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
<<<<<<< HEAD
        <Route path="/coins/:id" element={<Coin />} />
=======
        <Route path="/:id" element={<Coin />} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6499884 (hw-5)
=======
        <Route path="/error" element={<Error />} />
>>>>>>> cecd3c0 (Добавлена фильтрация по категориям)
=======
        <Route path="*" element={<Error />} />
>>>>>>> 4eb6af3 (Добавлен график цены криптовалюты, а также исправлены некоторые моменты)
      </Routes>
    </div>
  );
}

export default App;
