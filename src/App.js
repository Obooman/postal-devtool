import React, { PureComponent } from "react";
import EventList, { syncToBottom } from "./components/EventList";
import SplitPane from "react-split-pane";
import bridge from "./bridge";
import JSONData from "./components/JSONData";
import Toolbar from "./components/Toolbar";
import { connect } from "react-redux";

if (window.chrome.devtools.panels.themeName === "default") {
  import("./light.css").then();
}

if (window.chrome.devtools.panels.themeName === "dark") {
  import("./dark.css").then();
}

class App extends PureComponent {
  constructor(props) {
    super(props);

    bridge.on("publication", this.addEntry);

    document.addEventListener("keydown", ev => {
      if (/ArrowUp|ArrowDown/.test(ev.code)) {
        ev.preventDefault();
      }
    });

    document.addEventListener("keyup", ev => {
      const { currentItem, filteredItems, dispatch } = this.props;

      const { code } = ev;
      if (code === "ArrowUp") {
        var previousOne = Math.max(currentItem - 1, 0);
        dispatch.global.changeCurrentItem(previousOne);
      } else if (code === "ArrowDown") {
        var nextOne = Math.min(currentItem + 1, filteredItems.length - 1);
        dispatch.global.changeCurrentItem(nextOne);
      }
    });
  }

  render() {
    const { filteredItems, currentItem } = this.props;
    return (
      <div className="container">
        <Toolbar />
        <div style={{ position: "relative", flex: 1 }}>
          <SplitPane split="vertical" defaultSize="300">
            <EventList />
            <div>
              {filteredItems[currentItem] && (
                <JSONData json={filteredItems[currentItem]}></JSONData>
              )}
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }

  clear = () => {
    this.props.dispatch.global.clear();
  };

  addEntry = entry => {
    this.props.dispatch.global.pushEvent(entry);
    if (this.props.sticky) {
      syncToBottom();
    }
  };
}

const mapStateToProps = function(state) {
  return {
    currentItem: state.global.currentItem,
    filteredItems: state.global.filteredItems,
    sticky: state.global.sticky
  };
};

export default connect(mapStateToProps, null)(App);
