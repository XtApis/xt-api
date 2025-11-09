"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = createServer;
exports.slice = exports.setServerVariable = exports.setServer = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _storageUtils = require("../storage-utils");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

// TODO: we might want to export this

function createServer({
  servers,
  options: opts
}) {
  const storage = (0, _storageUtils.createStorage)(opts === null || opts === void 0 ? void 0 : opts.authPersistance);
  let options = servers.map(s => {
    var _srv$variables;
    // A deep copy of the original ServerObject, augmented with `storedValue` props.
    const srv = JSON.parse(JSON.stringify(s));
    let persisted = undefined;
    try {
      var _storage$getItem;
      persisted = JSON.parse((_storage$getItem = storage.getItem(`docusaurus.openapi.server/${s.url}`)) !== null && _storage$getItem !== void 0 ? _storage$getItem : "");
    } catch {}
    if (!persisted) {
      persisted = {};
    }
    if (!persisted.variables) {
      persisted.variables = {};
    }
    srv.variables = (_srv$variables = srv.variables) !== null && _srv$variables !== void 0 ? _srv$variables : {};
    for (const v of Object.keys(srv.variables)) {
      if (v in persisted.variables) {
        if (persisted.variables[v].storedValue !== undefined && persisted.variables[v].storedValue !== null && persisted.variables[v].storedValue !== "") {
          srv.variables[v].storedValue = persisted.variables[v].storedValue;
        } else {
          srv.variables[v].storedValue = srv.variables[v].default;
        }
      }
    }
    return srv;
  });
  return {
    value: options[0],
    options: options
  };
}
const initialState = {};
const slice = exports.slice = (0, _toolkit.createSlice)({
  name: "server",
  initialState,
  reducers: {
    setServer: (state, action) => {
      state.value = state.options.find(s => s.url === action.payload);
    },
    setServerVariable: (state, action) => {
      var _state$value;
      if ((_state$value = state.value) !== null && _state$value !== void 0 && _state$value.variables) {
        state.value.variables[action.payload.key].storedValue = action.payload.value;
      }
    }
  }
});
const {
  setServer,
  setServerVariable
} = slice.actions;
exports.setServerVariable = setServerVariable;
exports.setServer = setServer;
var _default = exports.default = slice.reducer;