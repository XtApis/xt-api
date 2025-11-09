"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _FormFileUpload = _interopRequireDefault(require("./../FormFileUpload"));
var _FormItem = _interopRequireDefault(require("./../FormItem"));
var _FormTextInput = _interopRequireDefault(require("./../FormTextInput"));
var _VSCode = _interopRequireDefault(require("./../VSCode"));
var _slice = require("./slice");
var _ContentType = _interopRequireDefault(require("../ContentType"));
var _FormMultiSelect = _interopRequireDefault(require("../FormMultiSelect"));
var _FormSelect = _interopRequireDefault(require("../FormSelect"));
var _hooks = require("../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function BodyWrap({
  requestBodyMetadata,
  jsonRequestBodyExample
}) {
  const contentType = (0, _hooks.useTypedSelector)(state => state.contentType.value);

  // NOTE: We used to check if body was required, but opted to always show the request body
  // to reduce confusion, see: https://github.com/cloud-annotations/docusaurus-openapi/issues/145

  // No body
  if (contentType === undefined) {
    return null;
  }
  return <>
      <_ContentType.default />
      <Body requestBodyMetadata={requestBodyMetadata} jsonRequestBodyExample={jsonRequestBodyExample} />
    </>;
}
function Body({
  requestBodyMetadata,
  jsonRequestBodyExample
}) {
  var _requestBodyMetadata$, _requestBodyMetadata$2;
  const contentType = (0, _hooks.useTypedSelector)(state => state.contentType.value);
  const dispatch = (0, _hooks.useTypedDispatch)();

  // Lot's of possible content-types:
  // - application/json
  // - application/xml
  // - text/plain
  // - text/css
  // - text/html
  // - text/javascript
  // - application/javascript
  // - multipart/form-data
  // - application/x-www-form-urlencoded
  // - image/svg+xml;charset=US-ASCII

  // Show editor:
  // - application/json
  // - application/xml
  // - */*

  // Show form:
  // - multipart/form-data
  // - application/x-www-form-urlencoded

  const schema = requestBodyMetadata === null || requestBodyMetadata === void 0 ? void 0 : (_requestBodyMetadata$ = requestBodyMetadata.content) === null || _requestBodyMetadata$ === void 0 ? void 0 : (_requestBodyMetadata$2 = _requestBodyMetadata$[contentType]) === null || _requestBodyMetadata$2 === void 0 ? void 0 : _requestBodyMetadata$2.schema;
  if ((schema === null || schema === void 0 ? void 0 : schema.format) === "binary") {
    return <_FormItem.default label="Body">
        <_FormFileUpload.default placeholder={schema.description || "Body"} onChange={file => {
        if (file === undefined) {
          dispatch((0, _slice.clearRawBody)());
          return;
        }
        dispatch((0, _slice.setFileRawBody)({
          src: `/path/to/${file.name}`,
          content: file
        }));
      }} />
      </_FormItem.default>;
  }
  if ((contentType === "multipart/form-data" || contentType === "application/x-www-form-urlencoded") && (schema === null || schema === void 0 ? void 0 : schema.type) === "object") {
    var _schema$properties;
    return <_FormItem.default label="Body">
        <div style={{
        marginTop: "calc(var(--ifm-pre-padding) / 2)",
        borderRadius: "4px",
        padding: "var(--ifm-pre-padding)",
        border: "1px solid var(--openapi-monaco-border-color)"
      }}>
          {Object.entries((_schema$properties = schema.properties) !== null && _schema$properties !== void 0 ? _schema$properties : {}).map(([key, val]) => {
          if (val.format === "binary") {
            return <_FormItem.default key={key} label={key}>
                  <_FormFileUpload.default placeholder={val.description || key} onChange={file => {
                if (file === undefined) {
                  dispatch((0, _slice.clearFormBodyKey)(key));
                  return;
                }
                dispatch((0, _slice.setFileFormBody)({
                  key: key,
                  value: {
                    src: `/path/to/${file.name}`,
                    content: file
                  }
                }));
              }} />
                </_FormItem.default>;
          }
          if (val.enum) {
            return <_FormItem.default key={key} label={key}>
                  <_FormSelect.default options={["---", ...val.enum]} onChange={e => {
                const val = e.target.value;
                if (val === "---") {
                  dispatch((0, _slice.clearFormBodyKey)(key));
                } else {
                  dispatch((0, _slice.setStringFormBody)({
                    key: key,
                    value: val
                  }));
                }
              }} />
                </_FormItem.default>;
          }
          if (val.type === "array" && val.items.enum && val.items.type === "string") {
            return <_FormItem.default key={key} label={key}>
                  <_FormMultiSelect.default options={val.items.enum} onChange={e => {
                const values = Array.prototype.filter.call(e.target.options, o => o.selected).map(o => o.value);
                if (values.length === 0) {
                  dispatch((0, _slice.clearFormBodyKey)(key));
                } else {
                  dispatch((0, _slice.setArrayFormBody)({
                    key: key,
                    value: values
                  }));
                }
              }} />
                </_FormItem.default>;
          }

          // TODO: support all the other types.
          return <_FormItem.default key={key} label={key}>
                <_FormTextInput.default placeholder={val.description || key} onChange={e => {
              dispatch((0, _slice.setStringFormBody)({
                key: key,
                value: e.target.value
              }));
            }} />
              </_FormItem.default>;
        })}
        </div>
      </_FormItem.default>;
  }
  let language = "plaintext";
  let exampleBodyString = ""; //"body content";

  if (contentType === "application/json") {
    if (jsonRequestBodyExample) {
      exampleBodyString = JSON.stringify(jsonRequestBodyExample, null, 2);
    }
    language = "json";
  }
  if (contentType === "application/xml") {
    language = "xml";
  }
  return <_FormItem.default label="Body">
      <_VSCode.default value={exampleBodyString} language={language} onChange={value => {
      if (value.trim() === "") {
        dispatch((0, _slice.clearRawBody)());
        return;
      }
      dispatch((0, _slice.setStringRawBody)(value));
    }} />
    </_FormItem.default>;
}
var _default = exports.default = BodyWrap;