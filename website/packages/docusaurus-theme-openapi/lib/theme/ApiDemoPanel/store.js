"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreWithState = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _slice = _interopRequireDefault(require("./Accept/slice"));
var _slice2 = _interopRequireDefault(require("./Authorization/slice"));
var _slice3 = _interopRequireDefault(require("./Body/slice"));
var _slice4 = _interopRequireDefault(require("./ContentType/slice"));
var _slice5 = _interopRequireDefault(require("./ParamOptions/slice"));
var _slice6 = _interopRequireDefault(require("./Response/slice"));
var _slice7 = _interopRequireDefault(require("./Server/slice"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const rootReducer = (0, _toolkit.combineReducers)({
  accept: _slice.default,
  contentType: _slice4.default,
  response: _slice6.default,
  server: _slice7.default,
  body: _slice3.default,
  params: _slice5.default,
  auth: _slice2.default
});
const createStoreWithState = (preloadedState, middlewares) => (0, _toolkit.configureStore)({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middlewares)
});
exports.createStoreWithState = createStoreWithState;