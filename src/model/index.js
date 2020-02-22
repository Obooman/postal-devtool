import { init } from "@rematch/core";
import globalModel from "./global";

const store = init({
  models: {
    global: globalModel
  }
});

export default store;
