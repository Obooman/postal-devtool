import React from "react";
import { connect } from "react-redux";
import FilterInput from "./FilterInput";

function Toolbar({ dispatch, recording }) {
  const clearRecords = () => {
    dispatch.global.clear();
  };

  const toggleRecord = () => {
    dispatch.global.toogleRecord();
  };

  return (
    <div className="toolbar">
      <button className="toolbar-button" onClick={toggleRecord}>
        <span role="img">{recording ? "🔴" : "⚫️"}</span>
      </button>
      <button className="toolbar-button" onClick={clearRecords}>
        <span role="img">🚫</span>
      </button>
      <FilterInput />
    </div>
  );
}

const mapStateToProps = ({ global }) => ({
  recording: global.recording
});

export default connect(mapStateToProps, null)(Toolbar);
