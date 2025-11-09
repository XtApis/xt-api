"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTypedSelector = exports.useTypedDispatch = void 0;
var _reactRedux = require("react-redux");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const useTypedDispatch = () => (0, _reactRedux.useDispatch)();
exports.useTypedDispatch = useTypedDispatch;
const useTypedSelector = exports.useTypedSelector = _reactRedux.useSelector;