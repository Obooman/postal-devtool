import React, { PureComponent } from "react";
import EventList, { syncToBottom } from "./components/EventList";
import SplitPane from "react-split-pane";
import bridge from "./bridge";
import JSONData from "./components/JSONData";
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
    this.state = {
      events: [],
      currentItem: -1
    };

    bridge.on("publication", this.addEntry);

    document.addEventListener("keyup", function(ev) {
      const { currentItem, events, dispatch } = props;

      ev.preventDefault();

      const { code } = ev;
      if (code === "ArrowUp") {
        var previousOne = Math.max(currentItem - 1, 0);
        dispatch.global.changeCurrentItem(previousOne);
      } else if (code === "ArrowDown") {
        var nextOne = Math.min(currentItem + 1, events.length - 1);
        dispatch.global.changeCurrentItem(nextOne);
      }
    });
  }

  render() {
    const { events, currentItem } = this.props;
    return (
      <div className="container">
        <div className="toolbar">
          <div className="toolbar-item" style={{ display: "inline-block" }}>
            <input type="text" placeholder="Filter" />
          </div>
          <button className="toolbar-button" onClick={this.clear}>
            <span>↪</span>
          </button>
        </div>
        <div style={{ position: "relative", flex: 1 }}>
          <SplitPane split="vertical" defaultSize="300">
            <EventList />
            <div>
              {events[currentItem] && (
                <JSONData json={events[currentItem]}></JSONData>
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
    events: state.global.events,
    sticky: state.global.sticky
  };
};

export default connect(mapStateToProps, null)(App);
