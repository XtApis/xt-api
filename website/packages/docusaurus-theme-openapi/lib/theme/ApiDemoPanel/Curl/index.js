"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useDocusaurusContext = _interopRequireDefault(require("@docusaurus/useDocusaurusContext"));
var _clsx = _interopRequireDefault(require("clsx"));
var _postmanCodeGenerators = _interopRequireDefault(require("postman-code-generators"));
var _prismReactRenderer = require("prism-react-renderer");
var _bash = _interopRequireDefault(require("refractor/lang/bash"));
var _buildPostmanRequest = _interopRequireDefault(require("./../buildPostmanRequest"));
var _FloatingButton = _interopRequireDefault(require("./../FloatingButton"));
var _stylesModule = _interopRequireDefault(require("./styles.module.css"));
var _hooks = require("../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

// @ts-ignore

(0, _bash.default)(_prismReactRenderer.Prism);
const languageSet = [{
  tabName: "cURL",
  highlight: "bash",
  language: "curl",
  variant: "curl",
  options: {
    longFormat: false,
    followRedirect: true,
    trimRequestBody: true
  }
}, {
  tabName: "Node",
  highlight: "javascript",
  language: "nodejs",
  variant: "axios",
  options: {
    ES6_enabled: true,
    followRedirect: true,
    trimRequestBody: true
  }
}, {
  tabName: "Go",
  highlight: "go",
  language: "go",
  variant: "native",
  options: {
    followRedirect: true,
    trimRequestBody: true
  }
}, {
  tabName: "Python",
  highlight: "python",
  language: "python",
  variant: "requests",
  options: {
    followRedirect: true,
    trimRequestBody: true
  }
}];
const languageTheme = {
  plain: {
    color: "var(--ifm-code-color)"
  },
  styles: [{
    types: ["inserted", "attr-name"],
    style: {
      color: "var(--openapi-code-green)"
    }
  }, {
    types: ["string", "url"],
    style: {
      color: "var(--openapi-code-green)"
    }
  }, {
    types: ["builtin", "char", "constant", "function"],
    style: {
      color: "var(--openapi-code-blue)"
    }
  }, {
    types: ["punctuation", "operator"],
    style: {
      color: "var(--openapi-code-dim)"
    }
  }, {
    types: ["class-name"],
    style: {
      color: "var(--openapi-code-orange)"
    }
  }, {
    types: ["tag", "arrow", "keyword"],
    style: {
      color: "var(--openapi-code-purple)"
    }
  }, {
    types: ["boolean"],
    style: {
      color: "var(--openapi-code-red)"
    }
  }]
};
function Curl({
  postman,
  codeSamples
}) {
  var _ref, _siteConfig$themeConf;
  // TODO: match theme for vscode.

  const {
    siteConfig
  } = (0, _useDocusaurusContext.default)();
  const [copyText, setCopyText] = (0, _react.useState)("Copy");
  const contentType = (0, _hooks.useTypedSelector)(state => state.contentType.value);
  const accept = (0, _hooks.useTypedSelector)(state => state.accept.value);
  const server = (0, _hooks.useTypedSelector)(state => state.server.value);
  const body = (0, _hooks.useTypedSelector)(state => state.body);
  const pathParams = (0, _hooks.useTypedSelector)(state => state.params.path);
  const queryParams = (0, _hooks.useTypedSelector)(state => state.params.query);
  const cookieParams = (0, _hooks.useTypedSelector)(state => state.params.cookie);
  const headerParams = (0, _hooks.useTypedSelector)(state => state.params.header);
  const auth = (0, _hooks.useTypedSelector)(state => state.auth);

  // TODO
  const langs = [...((_ref = siteConfig === null || siteConfig === void 0 ? void 0 : (_siteConfig$themeConf = siteConfig.themeConfig) === null || _siteConfig$themeConf === void 0 ? void 0 : _siteConfig$themeConf.languageTabs) !== null && _ref !== void 0 ? _ref : languageSet), ...codeSamples];
  const [language, setLanguage] = (0, _react.useState)(langs[0]);
  const [codeText, setCodeText] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {
    if (language && !!language.options) {
      const postmanRequest = (0, _buildPostmanRequest.default)(postman, {
        queryParams,
        pathParams,
        cookieParams,
        contentType,
        accept,
        headerParams,
        body,
        server,
        auth
      });
      _postmanCodeGenerators.default.convert(language.language, language.variant, postmanRequest, language.options, (error, snippet) => {
        if (error) {
          return;
        }
        setCodeText(snippet);
      });
    } else if (language && !!language.source) {
      setCodeText(language.source);
    } else {
      setCodeText("");
    }
  }, [accept, body, contentType, cookieParams, headerParams, language, pathParams, postman, queryParams, server, auth]);
  const ref = (0, _react.useRef)(null);
  const handleCurlCopy = () => {
    var _ref$current;
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
    if ((_ref$current = ref.current) !== null && _ref$current !== void 0 && _ref$current.innerText) {
      navigator.clipboard.writeText(ref.current.innerText);
    }
  };
  if (language === undefined) {
    return null;
  }
  return <>
      <div className={(0, _clsx.default)(_stylesModule.default.buttonGroup, "api-code-tab-group")}>
        {langs.map(lang => {
        return <button key={lang.tabName || lang.label} className={(0, _clsx.default)(language === lang ? _stylesModule.default.selected : undefined, language === lang ? "api-code-tab--active" : undefined, "api-code-tab")} type="button" onClick={() => setLanguage(lang)}>
              {lang.tabName || lang.label}
            </button>;
      })}
      </div>

      <_prismReactRenderer.Highlight theme={languageTheme} code={codeText} language={language.highlight || language.lang}>
        {({
        className,
        tokens,
        getLineProps,
        getTokenProps
      }) => <_FloatingButton.default onClick={handleCurlCopy} label={copyText}>
            <pre className={className} style={{
          background: "var(--openapi-card-background-color)",
          paddingRight: "60px",
          borderRadius: "2px 2px var(--openapi-card-border-radius) var(--openapi-card-border-radius)"
        }}>
              <code ref={ref}>
                {tokens.map((line, i) => <span {...getLineProps({
              line,
              key: i
            })}>
                    {line.map((token, key) => {
                if (token.types.includes("arrow")) {
                  token.types = ["arrow"];
                }
                return <span {...getTokenProps({
                  token,
                  key
                })} />;
              })}
                    {"\n"}
                  </span>)}
              </code>
            </pre>
          </_FloatingButton.default>}
      </_prismReactRenderer.Highlight>
    </>;
}
var _default = exports.default = Curl;