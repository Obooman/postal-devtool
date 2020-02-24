import EventEmitter from "eventemitter2";

if (process.env.NODE_ENV === "development") {
  window.chrome = {
    runtime: {
      connect() {
        return { postMessage() {}, onMessage: { addListener() {} } };
      }
    },
    devtools: {
      inspectedWindow: {
        tabId: 12
      },
      panels: {
        themeName: "dark"
      }
    }
  };
}

const bridgeEmitter = new EventEmitter();
const bgConn = window.chrome.runtime.connect({});

bgConn.postMessage({
  type: "init",
  tabId: window.chrome.devtools.inspectedWindow.tabId
});

bgConn.postMessage({ type: "pending" });

bgConn.onMessage.addListener((req, sender) => {
  if (req.__fromPostaljsDevtoolsBridge) {
    bridgeEmitter.emit(req.type, req.data);
    return true;
  }
});

export default bridgeEmitter;
