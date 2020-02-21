import React, { PureComponent } from "react";
import EventItem from "./components/EventItem";
import JSONData from "./components/JSONData";
import SplitPane from "react-split-pane";
import bridge from "./bridge";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentItem: -1
    };

    this.dataMap = {};

    bridge.on("publication", entry => {
      this.setState({
        events: this.state.events.concat([entry])
      });
    });

    document.addEventListener("keyup", ev => {
      const { code } = ev;
      if (code === "ArrowUp") {
        var previousOne = Math.max(this.state.currentItem - 1, 0);
        this.setState({
          currentItem: previousOne
        });
      } else if (code === "ArrowDown") {
        var nextOne = Math.min(
          this.state.currentItem + 1,
          this.state.events.length - 1
        );
        this.setState({
          currentItem: nextOne
        });
      }
    });
  }

  render() {
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
            <div
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                height: "100%"
              }}
            >
              {this.state.events.map((event, index) => (
                <EventItem
                  event={event}
                  active={this.state.currentItem}
                  clickHandler={this.setItem}
                  key={event.timestamp + index}
                  index={index}
                ></EventItem>
              ))}
            </div>
            <div>
              {this.state.events[this.state.currentItem] && (
                <JSONData
                  json={this.state.events[this.state.currentItem]}
                ></JSONData>
              )}
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }

  setItem = index => {
    this.setState({
      currentItem: index
    });
  };

  clear = () => {
    this.setState({
      currentItem: -1,
      events: []
    });
  };
}
