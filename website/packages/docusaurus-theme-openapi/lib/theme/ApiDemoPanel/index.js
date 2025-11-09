"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _useDocusaurusContext = _interopRequireDefault(require("@docusaurus/useDocusaurusContext"));
var _Curl = _interopRequireDefault(require("@theme/ApiDemoPanel/Curl"));
var _Response = _interopRequireDefault(require("@theme/ApiDemoPanel/Response"));
var _postmanCollection = _interopRequireDefault(require("postman-collection"));
var _reactRedux = require("react-redux");
var _Accept = _interopRequireDefault(require("./Accept"));
var _Authorization = _interopRequireDefault(require("./Authorization"));
var _slice = require("./Authorization/slice");
var _Body = _interopRequireDefault(require("./Body"));
var _Execute = _interopRequireDefault(require("./Execute"));
var _MethodEndpoint = _interopRequireDefault(require("./MethodEndpoint"));
var _ParamOptions = _interopRequireDefault(require("./ParamOptions"));
var _persistanceMiddleware = require("./persistanceMiddleware");
var _Server = _interopRequireDefault(require("./Server"));
var _slice2 = require("./Server/slice");
var _store = require("./store");
var _stylesModule = _interopRequireDefault(require("./styles.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function ApiDemoPanel({
  item
}) {
  var _item$responses, _item$requestBody$con, _item$requestBody, _item$servers, _item$parameters, _xCodeSamples;
  const {
    siteConfig
  } = (0, _useDocusaurusContext.default)();
  const themeConfig = siteConfig.themeConfig;
  const options = themeConfig.api;
  const postman = new _postmanCollection.default.Request(item.postman);
  const acceptArray = Array.from(new Set(Object.values((_item$responses = item.responses) !== null && _item$responses !== void 0 ? _item$responses : {}).map(response => {
    var _response$content;
    return Object.keys((_response$content = response.content) !== null && _response$content !== void 0 ? _response$content : {});
  }).flat()));
  const content = (_item$requestBody$con = (_item$requestBody = item.requestBody) === null || _item$requestBody === void 0 ? void 0 : _item$requestBody.content) !== null && _item$requestBody$con !== void 0 ? _item$requestBody$con : {};
  const contentTypeArray = Object.keys(content);
  const servers = (_item$servers = item.servers) !== null && _item$servers !== void 0 ? _item$servers : [];
  const params = {
    path: [],
    query: [],
    header: [],
    cookie: []
  };
  (_item$parameters = item.parameters) === null || _item$parameters === void 0 ? void 0 : _item$parameters.forEach(param => {
    params[param.in].push(param);
  });
  const auth = (0, _slice.createAuth)({
    security: item.security,
    securitySchemes: item.securitySchemes,
    options
  });
  const server = (0, _slice2.createServer)({
    servers,
    options
  });
  const persistanceMiddleware = (0, _persistanceMiddleware.createPersistanceMiddleware)(options);
  const store2 = (0, _store.createStoreWithState)({
    accept: {
      value: acceptArray[0],
      options: acceptArray
    },
    contentType: {
      value: contentTypeArray[0],
      options: contentTypeArray
    },
    server: server,
    response: {
      value: undefined
    },
    body: {
      type: "empty"
    },
    params,
    auth
  }, [persistanceMiddleware]);
  const handleSubmit = e => {
    e.preventDefault();
  };
  const {
    path,
    method
  } = item;
  return <_reactRedux.Provider store={store2}>
      <div style={{
      marginTop: "3.5em"
    }}>
        <form onSubmit={handleSubmit}>
          <_Authorization.default />

          {item.operationId !== undefined && <div style={{
          marginBottom: "var(--ifm-table-cell-padding)"
        }}>
              <code>
                <b>{item.operationId}</b>
              </code>
            </div>}

          <_MethodEndpoint.default method={method} path={path} />

          <div className={_stylesModule.default.optionsPanel}>
            <_ParamOptions.default />
            <_Body.default jsonRequestBodyExample={item.jsonRequestBodyExample} requestBodyMetadata={item.requestBody} />
            <_Accept.default />
          </div>

          <_Server.default />

          <_Curl.default postman={postman} codeSamples={(_xCodeSamples = item["x-code-samples"]) !== null && _xCodeSamples !== void 0 ? _xCodeSamples : []} />

          <_Execute.default postman={postman} proxy={options === null || options === void 0 ? void 0 : options.proxy} />
        </form>

        <_Response.default />
      </div>
    </_reactRedux.Provider>;
}
var _default = exports.default = ApiDemoPanel;