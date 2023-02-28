import React from "react";

import "./App.css";
import Coin from "@pages/Coin";
import Main from "@pages/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
