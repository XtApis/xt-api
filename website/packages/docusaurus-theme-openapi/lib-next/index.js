/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import path from "path";
export default function docusaurusThemeOpenAPI() {
  return {
    name: "docusaurus-theme-openapi",
    getThemePath() {
      return path.join(__dirname, "..", "lib-next", "theme");
    },
    getTypeScriptThemePath() {
      return path.resolve(__dirname, "..", "src", "theme");
    },
    configureWebpack(_config, _isServer, { currentBundler }) {
      const bundler = currentBundler.instance ?? require("webpack");
      return {
        plugins: [
          new bundler.ProvidePlugin({
            Buffer: [require.resolve("buffer/"), "Buffer"],
            process: require.resolve("process/browser"),
          }),
        ],
        resolve: {
          fallback: {
            buffer: require.resolve("buffer/"),
            process: require.resolve("process/browser"),
          },
        },
      };
    },
  };
}
