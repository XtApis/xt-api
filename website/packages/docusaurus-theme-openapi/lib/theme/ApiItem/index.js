"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ExecutionEnvironment = _interopRequireDefault(require("@docusaurus/ExecutionEnvironment"));
var _themeCommon = require("@docusaurus/theme-common");
var _DocPaginator = _interopRequireDefault(require("@theme/DocPaginator"));
var _clsx = _interopRequireDefault(require("clsx"));
var _stylesModule = _interopRequireDefault(require("./styles.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

let ApiDemoPanel = _ => <div style={{
  marginTop: "3.5em"
}} />;
if (_ExecutionEnvironment.default.canUseDOM) {
  ApiDemoPanel = require("@theme/ApiDemoPanel").default;
}
function ApiItem(props) {
  const {
    content: ApiContent
  } = props;
  const {
    metadata,
    frontMatter
  } = ApiContent;
  const {
    image,
    keywords
  } = frontMatter;
  const {
    description,
    title,
    api,
    previous,
    next
  } = metadata;
  return <>
      <_themeCommon.PageMetadata {...{
      title,
      description,
      keywords,
      image
    }} />

      <div className="row">
        <div className="col">
          <div className={_stylesModule.default.apiItemContainer}>
            <article>
              <div className={(0, _clsx.default)("theme-api-markdown", "markdown")}>
                <ApiContent />
              </div>
            </article>

            <_DocPaginator.default previous={previous} next={next} />
          </div>
        </div>
        <div className={(0, _clsx.default)("col", api ? "col--5" : "col--3")}>
          {api && <ApiDemoPanel item={api} />}
        </div>
      </div>
    </>;
}
var _default = exports.default = ApiItem;