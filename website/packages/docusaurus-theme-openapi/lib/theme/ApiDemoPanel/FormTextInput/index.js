"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _stylesModule = _interopRequireDefault(require("./styles.module.css"));
var _text = require("../text");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function FormTextInput({
  value,
  placeholder,
  password,
  onChange
}) {
  return <input className={_stylesModule.default.input} type={password ? "password" : "text"} placeholder={(0, _text.stripText)(placeholder)} value={value} onChange={onChange} autoComplete="off" />;
}
var _default = exports.default = FormTextInput;