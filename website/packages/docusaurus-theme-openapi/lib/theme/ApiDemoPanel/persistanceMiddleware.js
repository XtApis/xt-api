"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPersistanceMiddleware = createPersistanceMiddleware;
var _slice = require("./Authorization/slice");
var _slice2 = require("./Server/slice");
var _storageUtils = require("./storage-utils");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function createPersistanceMiddleware(options) {
  const persistanceMiddleware = storeAPI => next => action => {
    const result = next(action);
    const state = storeAPI.getState();
    const storage = (0, _storageUtils.createStorage)(options === null || options === void 0 ? void 0 : options.authPersistance);
    if (action.type === _slice.setAuthData.type) {
      for (const [key, value] of Object.entries(state.auth.data)) {
        if (Object.values(value).filter(Boolean).length > 0) {
          storage.setItem(key, JSON.stringify(value));
        } else {
          storage.removeItem(key);
        }
      }
    }
    if (action.type === _slice.setSelectedAuth.type) {
      if (state.auth.selected) {
        storage.setItem((0, _storageUtils.hashArray)(Object.keys(state.auth.options)), state.auth.selected);
      }
    }
    if (action.type === _slice2.setServer.type) {
      var _state$server$value;
      if ((_state$server$value = state.server.value) !== null && _state$server$value !== void 0 && _state$server$value.url) {
        var _state$server$value2;
        // FIXME What to use as key?
        storage.setItem(`docusaurus.openapi.server/${(_state$server$value2 = state.server.value) === null || _state$server$value2 === void 0 ? void 0 : _state$server$value2.url}`, JSON.stringify(state.server.value));
      }
    }
    if (action.type === _slice2.setServerVariable.type) {
      var _state$server$value3;
      if ((_state$server$value3 = state.server.value) !== null && _state$server$value3 !== void 0 && _state$server$value3.url) {
        var _state$server$value4;
        storage.setItem(`docusaurus.openapi.server/${(_state$server$value4 = state.server.value) === null || _state$server$value4 === void 0 ? void 0 : _state$server$value4.url}`, JSON.stringify(state.server.value));
      }
    }
    return result;
  };
  return persistanceMiddleware;
}