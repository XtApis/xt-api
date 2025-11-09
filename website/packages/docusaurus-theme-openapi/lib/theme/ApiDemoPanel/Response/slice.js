"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = exports.setResponse = exports.default = exports.clearResponse = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const initialState = {};
const slice = exports.slice = (0, _toolkit.createSlice)({
  name: "response",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state.value = action.payload;
    },
    clearResponse: state => {
      state.value = undefined;
    }
  }
});
const {
  setResponse,
  clearResponse
} = slice.actions;
exports.clearResponse = clearResponse;
exports.setResponse = setResponse;
var _default = exports.default = slice.reducer;