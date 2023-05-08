import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Globalprovider from "./components/context/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Globalprovider>
        <App />
      </Globalprovider>
    </BrowserRouter>
  </React.StrictMode>
);
