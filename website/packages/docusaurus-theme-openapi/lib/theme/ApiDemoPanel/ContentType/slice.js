"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = exports.setContentType = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const initialState = {};
const slice = exports.slice = (0, _toolkit.createSlice)({
  name: "contentType",
  initialState,
  reducers: {
    setContentType: (state, action) => {
      state.value = action.payload;
    }
  }
});
const {
  setContentType
} = slice.actions;
exports.setContentType = setContentType;
var _default = exports.default = slice.reducer;