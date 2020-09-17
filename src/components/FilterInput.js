import React, { useState } from "react";
import { connect } from "react-redux";

function FilterInput({ dispatch, recording }) {
  const [inputValue, setValue] = useState("");

  const changeHandler = ev => {
    const value = ev.target.value;
    setValue(value);

    // trim
    const patternStr = value.replace(/^\s+|\s+$/gm, "");
    try {
      const pattern = !!patternStr ? new RegExp(patternStr, "im") : /./;

      dispatch.global.updateFilter(pattern);
    } catch (e) {
      dispatch.global.updateFilter(/^this_is_a_no_match_pattern/);
    }
  };

  return (
    <div className="toolbar-item">
      <input
        value={inputValue}
        type="text"
        placeholder="Filter"
        onChange={changeHandler}
      />
    </div>
  );
}

const mapStateToProps = ({ global }) => ({
  recording: global.recording
});

export default connect(mapStateToProps, null)(FilterInput);
