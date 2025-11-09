/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

/// <reference types="@docusaurus/preset-classic" />

import type { Preset, LoadContext } from "@docusaurus/types";

declare module "@docusaurus/preset-classic" {
  export default function preset(
    context: LoadContext,
    options: Options
  ): Preset;
}
