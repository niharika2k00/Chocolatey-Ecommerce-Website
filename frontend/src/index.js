import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./store.js";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
