"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = exports.setStringRawBody = exports.setStringFormBody = exports.setFileRawBody = exports.setFileFormBody = exports.setArrayFormBody = exports.default = exports.clearRawBody = exports.clearFormBodyKey = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const initialState = {};
const slice = exports.slice = (0, _toolkit.createSlice)({
  name: "body",
  initialState,
  reducers: {
    clearRawBody: _state => {
      return {
        type: "empty"
      };
    },
    setStringRawBody: (_state, action) => {
      return {
        type: "raw",
        content: {
          type: "string",
          value: action.payload
        }
      };
    },
    setFileRawBody: (_state, action) => {
      return {
        type: "raw",
        content: {
          type: "file",
          value: action.payload
        }
      };
    },
    clearFormBodyKey: (state, action) => {
      if ((state === null || state === void 0 ? void 0 : state.type) === "form") {
        delete state.content[action.payload];
      }
    },
    setStringFormBody: (state, action) => {
      if ((state === null || state === void 0 ? void 0 : state.type) !== "form") {
        return {
          type: "form",
          content: {
            [action.payload.key]: {
              type: "string",
              value: action.payload.value
            }
          }
        };
      }
      state.content[action.payload.key] = {
        type: "string",
        value: action.payload.value
      };
      return state;
    },
    setArrayFormBody: (state, action) => {
      if ((state === null || state === void 0 ? void 0 : state.type) !== "form") {
        return {
          type: "form",
          content: {
            [action.payload.key]: {
              type: "array",
              value: {
                type: "string",
                value: action.payload.value
              }
            }
          }
        };
      }
      state.content[action.payload.key] = {
        type: "array",
        value: {
          type: "string",
          value: action.payload.value
        }
      };
      return state;
    },
    setFileFormBody: (state, action) => {
      if ((state === null || state === void 0 ? void 0 : state.type) !== "form") {
        return {
          type: "form",
          content: {
            [action.payload.key]: {
              type: "file",
              value: action.payload.value
            }
          }
        };
      }
      state.content[action.payload.key] = {
        type: "file",
        value: action.payload.value
      };
      return state;
    }
  }
});
const {
  clearRawBody,
  setStringRawBody,
  setFileRawBody,
  clearFormBodyKey,
  setStringFormBody,
  setArrayFormBody,
  setFileFormBody
} = slice.actions;
exports.setFileFormBody = setFileFormBody;
exports.setArrayFormBody = setArrayFormBody;
exports.setStringFormBody = setStringFormBody;
exports.clearFormBodyKey = clearFormBodyKey;
exports.setFileRawBody = setFileRawBody;
exports.setStringRawBody = setStringRawBody;
exports.clearRawBody = clearRawBody;
var _default = exports.default = slice.reducer;