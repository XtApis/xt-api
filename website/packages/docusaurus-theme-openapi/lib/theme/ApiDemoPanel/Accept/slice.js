"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = exports.setAccept = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const initialState = {};
const slice = exports.slice = (0, _toolkit.createSlice)({
  name: "accept",
  initialState,
  reducers: {
    setAccept: (state, action) => {
      state.value = action.payload;
    }
  }
});
const {
  setAccept
} = slice.actions;
exports.setAccept = setAccept;
var _default = exports.default = slice.reducer;