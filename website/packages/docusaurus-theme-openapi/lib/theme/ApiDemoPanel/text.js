"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripText = stripText;
var _marked = require("marked");
var _striptags = _interopRequireDefault(require("striptags"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function stripText(text) {
  if (text === undefined) {
    return "";
  }
  const renderer = new _marked.marked.TextRenderer();
  _marked.marked.use({
    silent: true,
    renderer
  });
  const parsedMarkdown = _marked.marked.parse(text, {
    async: false
  });
  return (0, _striptags.default)(parsedMarkdown, [], " ").replace(/\s+/g, " ").trim();
}