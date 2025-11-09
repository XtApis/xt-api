"use strict";
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pluginOpenAPI;
function pluginOpenAPI(_context, options) {
    return {
        name: "docusaurus-plugin-proxy",
        // docusaurus type is outdated
        configureWebpack() {
            return {
                devServer: {
                    proxy: options.proxy,
                },
            };
        },
    };
}
