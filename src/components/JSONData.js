import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/jsx/jsx.js";
import "codemirror/lib/codemirror.css";

const isDark = window.chrome.devtools.panels.themeName === "dark";

const codeMirrorOptions = {
  mode: { name: "javascript", json: true },
  lineNumbers: true,
  styleSelectedText: true
};

if (isDark) {
  import("codemirror/theme/ayu-mirage.css").then();
  codeMirrorOptions.theme = "ayu-mirage";
}

export default function JSONData({ json }) {
  return (
    <CodeMirror
      value={JSON.stringify(json, null, 2)}
      options={codeMirrorOptions}
      style={{ width: "100%", height: "100%" }}
      onBeforeChange={(editor, data, value) => {}}
      onChange={(editor, data, value) => {}}
    />
  );
}
