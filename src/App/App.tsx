import React from "react";

import Coin from "@pages/Coin";
import Main from "@pages/main";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Routes, Route } from "react-router-dom";
import Error from "@pages/Error";


function App() {
  useQueryParamsStoreInit();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Coin />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
