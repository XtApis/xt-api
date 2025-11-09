/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

export function getAuthDataKeys(security) {
  // Bearer Auth
  if (security.type === "http" && security.scheme === "bearer") {
    return ["token"];
  }

  // Basic Auth
  if (security.type === "http" && security.scheme === "basic") {
    return ["username", "password"];
  }

  // none
  return [];
}
