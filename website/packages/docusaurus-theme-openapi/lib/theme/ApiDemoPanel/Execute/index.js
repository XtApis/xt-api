"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _buildPostmanRequest = _interopRequireDefault(require("./../buildPostmanRequest"));
var _makeRequest = _interopRequireDefault(require("./makeRequest"));
var _hooks = require("../hooks");
var _slice = require("../Response/slice");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function validateRequest(params) {
  for (let paramList of Object.values(params)) {
    for (let param of paramList) {
      if (param.required && !param.value) {
        return false;
      }
    }
  }
  return true;
}
function Execute({
  postman,
  proxy
}) {
  const pathParams = (0, _hooks.useTypedSelector)(state => state.params.path);
  const queryParams = (0, _hooks.useTypedSelector)(state => state.params.query);
  const cookieParams = (0, _hooks.useTypedSelector)(state => state.params.cookie);
  const headerParams = (0, _hooks.useTypedSelector)(state => state.params.header);
  const contentType = (0, _hooks.useTypedSelector)(state => state.contentType.value);
  const body = (0, _hooks.useTypedSelector)(state => state.body);
  const accept = (0, _hooks.useTypedSelector)(state => state.accept.value);
  const server = (0, _hooks.useTypedSelector)(state => state.server.value);
  const params = (0, _hooks.useTypedSelector)(state => state.params);
  const auth = (0, _hooks.useTypedSelector)(state => state.auth);
  const isValidRequest = validateRequest(params);
  const dispatch = (0, _hooks.useTypedDispatch)();
  const postmanRequest = (0, _buildPostmanRequest.default)(postman, {
    queryParams,
    pathParams,
    cookieParams,
    contentType,
    accept,
    headerParams,
    body,
    server,
    auth
  });
  return <button className="button button--block button--primary" style={{
    height: "48px",
    marginBottom: "var(--ifm-spacing-vertical)"
  }} disabled={!isValidRequest} onClick={async () => {
    dispatch((0, _slice.setResponse)("loading..."));
    try {
      const res = await (0, _makeRequest.default)(postmanRequest, proxy, body);
      dispatch((0, _slice.setResponse)(res));
    } catch (e) {
      var _e$message;
      dispatch((0, _slice.setResponse)((_e$message = e.message) !== null && _e$message !== void 0 ? _e$message : "Error fetching."));
    }
  }} type="submit">
      Execute
    </button>;
}
var _default = exports.default = Execute;