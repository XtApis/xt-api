"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _FloatingButton = _interopRequireDefault(require("./../FloatingButton"));
var _slice = require("./slice");
var _hooks = require("../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

// TODO: We probably shouldn't attempt to format XML...
function formatXml(xml) {
  const tab = "  ";
  let formatted = "";
  let indent = "";
  xml.split(/>\s*</).forEach(node => {
    if (node.match(/^\/\w/)) {
      // decrease indent by one 'tab'
      indent = indent.substring(tab.length);
    }
    formatted += indent + "<" + node + ">\r\n";
    if (node.match(/^<?\w[^>]*[^/]$/)) {
      // increase indent
      indent += tab;
    }
  });
  return formatted.substring(1, formatted.length - 3);
}
function Response() {
  const response = (0, _hooks.useTypedSelector)(state => state.response.value);
  const dispatch = (0, _hooks.useTypedDispatch)();
  if (response === undefined) {
    return null;
  }
  let prettyResponse = response;
  try {
    prettyResponse = JSON.stringify(JSON.parse(response), null, 2);
  } catch {
    if (response.startsWith("<?xml ")) {
      prettyResponse = formatXml(response);
    }
  }
  return <_FloatingButton.default onClick={() => dispatch((0, _slice.clearResponse)())} label="Clear">
      <pre style={{
      background: "var(--openapi-card-background-color)",
      borderRadius: "var(--openapi-card-border-radius)",
      paddingRight: "60px"
    }}>
        <code>{prettyResponse || "No Response"}</code>
      </pre>
    </_FloatingButton.default>;
}
var _default = exports.default = Response;