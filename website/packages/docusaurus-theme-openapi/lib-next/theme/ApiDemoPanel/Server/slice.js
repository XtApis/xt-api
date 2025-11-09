/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { createSlice } from "@reduxjs/toolkit";
// TODO: we might want to export this

import { createStorage } from "../storage-utils";
export function createServer({ servers, options: opts }) {
  const storage = createStorage(opts?.authPersistance);
  let options = servers.map((s) => {
    // A deep copy of the original ServerObject, augmented with `storedValue` props.
    const srv = JSON.parse(JSON.stringify(s));
    let persisted = undefined;
    try {
      persisted = JSON.parse(
        storage.getItem(`docusaurus.openapi.server/${s.url}`) ?? ""
      );
    } catch {}
    if (!persisted) {
      persisted = {};
    }
    if (!persisted.variables) {
      persisted.variables = {};
    }
    srv.variables = srv.variables ?? {};
    for (const v of Object.keys(srv.variables)) {
      if (v in persisted.variables) {
        if (
          persisted.variables[v].storedValue !== undefined &&
          persisted.variables[v].storedValue !== null &&
          persisted.variables[v].storedValue !== ""
        ) {
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
    options: options,
  };
}
const initialState = {};
export const slice = createSlice({
  name: "server",
  initialState,
  reducers: {
    setServer: (state, action) => {
      state.value = state.options.find((s) => s.url === action.payload);
    },
    setServerVariable: (state, action) => {
      if (state.value?.variables) {
        state.value.variables[action.payload.key].storedValue =
          action.payload.value;
      }
    },
  },
});
export const { setServer, setServerVariable } = slice.actions;
export default slice.reducer;
