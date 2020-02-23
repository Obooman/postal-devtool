import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./model/index";
import { Provider } from "react-redux";

const root = document.querySelector("#root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
