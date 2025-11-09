"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MarkdownItem;
var _react = _interopRequireDefault(require("react"));
var _themeCommon = require("@docusaurus/theme-common");
var _DocPaginator = _interopRequireDefault(require("@theme/DocPaginator"));
var _MDXContent = _interopRequireDefault(require("@theme/MDXContent"));
var _clsx = _interopRequireDefault(require("clsx"));
var _stylesModule = _interopRequireDefault(require("../ApiItem/styles.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function MarkdownItem(props) {
  const {
    content: MDXPageContent
  } = props;
  const {
    metadata: {
      title,
      description,
      frontMatter,
      previous,
      next
    }
  } = MDXPageContent;
  const {
    image,
    keywords
  } = frontMatter;
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
              <div className={(0, _clsx.default)("theme-api-markdown", "theme-api-markdown-item", "markdown")}>
                <_MDXContent.default>
                  <MDXPageContent />
                </_MDXContent.default>
              </div>
            </article>
            <_DocPaginator.default previous={previous} next={next} />
          </div>
        </div>
      </div>
    </>;
}