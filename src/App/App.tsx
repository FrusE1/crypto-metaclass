import React from "react";

import Coin from "@pages/Coin";
import Main from "@pages/main";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Routes, Route } from "react-router-dom";

function App() {
  useQueryParamsStoreInit();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Coin />} />
      </Routes>
    </div>
  );
}

export default App;
