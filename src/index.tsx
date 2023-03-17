import React from "react";

import ReactDOM from "react-dom/client";
import "./config/configureMobX";
import "@styles/styles.scss";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "regenerator-runtime";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
