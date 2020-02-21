import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/jsx/jsx.js";
import "codemirror/lib/codemirror.css";
import "./main.css";

export default function JSONData(props) {
  return (
    <CodeMirror
      value={JSON.stringify(props.json, null, 2)}
      options={{
        mode: { name: "javascript", json: true },
        lineNumbers: true,
        styleSelectedText: true
      }}
      style={{ width: "100%", height: "100%" }}
      onBeforeChange={(editor, data, value) => {}}
      onChange={(editor, data, value) => {}}
    />
  );
}
