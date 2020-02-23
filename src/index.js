import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { syncToBottom } from "./components/EventList";
import store from "./model/index";
import { Provider } from "react-redux";

const root = document.querySelector("#root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

if (process.env.NODE_ENV === "development") {
  setInterval(() => {
    if (!store.getState().global.recording) {
      return;
    }

    store.dispatch.global.pushEvent({
      topic: "SSOME",
      timestamp: Date.now(),
      channel: "SomeChannel",
      data: {
        others: {}
      }
    });

    if (store.getState().global.sticky) {
      syncToBottom();
    }
  }, 1000);
}
