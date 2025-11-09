"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = exports.setParam = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const initialState = {};
const slice = exports.slice = (0, _toolkit.createSlice)({
  name: "params",
  initialState,
  reducers: {
    setParam: (state, action) => {
      const newParam = action.payload;
      const paramGroup = state[action.payload.in];
      const index = paramGroup.findIndex(p => p.name === newParam.name);
      paramGroup[index] = newParam;
    }
  }
});
const {
  setParam
} = slice.actions;
exports.setParam = setParam;
var _default = exports.default = slice.reducer;