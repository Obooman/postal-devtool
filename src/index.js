import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { syncToBottom } from "./components/EventList";
import store from "./model/index";
import { Provider } from "react-redux";

const root = document.querySelector("#root");

setInterval(() => {
  store.dispatch.global.pushEvent({
    topic: "TEST",
    channel: "GOOD",
    timestamp: Date.now(),
    someoter: {
      one: {
        name: ""
      }
    }
  });

  if (store.getState().global.sticky) {
    syncToBottom();
  }
}, 300);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
