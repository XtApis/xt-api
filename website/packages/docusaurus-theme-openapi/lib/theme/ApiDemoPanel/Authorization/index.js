"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _slice = require("./slice");
var _FormItem = _interopRequireDefault(require("../FormItem"));
var _FormSelect = _interopRequireDefault(require("../FormSelect"));
var _FormTextInput = _interopRequireDefault(require("../FormTextInput"));
var _hooks = require("../hooks");
var _stylesModule = _interopRequireDefault(require("../styles.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function LockButton({
  mode,
  children,
  style,
  ...rest
}) {
  return <button className={(0, _clsx.default)("button", "button--primary", {
    "button--outline": mode !== "locked"
  })} style={{
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    marginBottom: "var(--ifm-spacing-vertical)",
    ...style
  }} type="button" {...rest}>
      <span>{children}</span>

      <svg style={{
      marginLeft: "12px",
      width: "18px",
      height: "18px",
      fill: "currentColor"
    }} viewBox="0 0 20 20" id={mode}>
        {mode === "locked" ? <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8z"></path> : <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path>}
      </svg>
    </button>;
}
function validateData(selectedAuth, data) {
  for (const scheme of selectedAuth) {
    if (data[scheme.key] === undefined) {
      return false;
    }
    const hasMissingKeys = Object.values(data[scheme.key]).includes(undefined);
    if (hasMissingKeys) {
      return false;
    }
  }
  return true;
}
function Authorization() {
  const [editing, setEditing] = (0, _react.useState)(false);
  const data = (0, _hooks.useTypedSelector)(state => state.auth.data);
  const options = (0, _hooks.useTypedSelector)(state => state.auth.options);
  const selected = (0, _hooks.useTypedSelector)(state => state.auth.selected);
  const dispatch = (0, _hooks.useTypedDispatch)();
  if (selected === undefined) {
    return null;
  }
  const selectedAuth = options[selected];
  const authenticated = validateData(selectedAuth, data);
  const optionKeys = Object.keys(options);
  if (editing) {
    return <div className={_stylesModule.default.optionsPanel}>
        {optionKeys.length > 1 && <_FormItem.default label="Security Scheme">
            <_FormSelect.default options={optionKeys} value={selected} onChange={e => {
          dispatch((0, _slice.setSelectedAuth)(e.target.value));
        }} />
          </_FormItem.default>}
        {selectedAuth.map(a => {
        if (a.type === "http" && a.scheme === "bearer") {
          var _data$a$key$token;
          return <_FormItem.default label="Bearer Token" key={selected + "-bearer"}>
                <_FormTextInput.default placeholder="Bearer Token" value={(_data$a$key$token = data[a.key].token) !== null && _data$a$key$token !== void 0 ? _data$a$key$token : ""} onChange={e => {
              const value = e.target.value.trim();
              dispatch((0, _slice.setAuthData)({
                scheme: a.key,
                key: "token",
                value: value ? value : undefined
              }));
            }} />
              </_FormItem.default>;
        }
        if (a.type === "http" && a.scheme === "basic") {
          var _data$a$key$username, _data$a$key$password;
          return <_react.default.Fragment key={selected + "-basic"}>
                <_FormItem.default label="Username">
                  <_FormTextInput.default placeholder="Username" value={(_data$a$key$username = data[a.key].username) !== null && _data$a$key$username !== void 0 ? _data$a$key$username : ""} onChange={e => {
                const value = e.target.value.trim();
                dispatch((0, _slice.setAuthData)({
                  scheme: a.key,
                  key: "username",
                  value: value ? value : undefined
                }));
              }} />
                </_FormItem.default>
                <_FormItem.default label="Password">
                  <_FormTextInput.default placeholder="Password" password value={(_data$a$key$password = data[a.key].password) !== null && _data$a$key$password !== void 0 ? _data$a$key$password : ""} onChange={e => {
                const value = e.target.value.trim();
                dispatch((0, _slice.setAuthData)({
                  scheme: a.key,
                  key: "password",
                  value: value ? value : undefined
                }));
              }} />
                </_FormItem.default>
              </_react.default.Fragment>;
        }
        if (a.type === "apiKey") {
          return <_FormItem.default label={a.name} key={a.key + "-apiKey"}>
                <_FormTextInput.default placeholder={a.name} onChange={e => {
              const value = e.target.value.trim();
              dispatch((0, _slice.setAuthData)({
                scheme: a.key,
                key: a.name,
                value: value ? value : undefined
              }));
            }} />
              </_FormItem.default>;
        }
        return null;
      })}
        <LockButton mode="unlocked" style={{
        marginTop: "var(--ifm-spacing-vertical)",
        marginBottom: 0
      }} onClick={() => {
        setEditing(false);
      }}>
          Save
        </LockButton>
      </div>;
  }
  if (authenticated) {
    return <LockButton mode="locked" onClick={() => {
      setEditing(true);
    }}>
        Authorized
      </LockButton>;
  }
  return <LockButton mode="unlocked" onClick={() => {
    setEditing(true);
  }}>
      Authorize
    </LockButton>;
}
var _default = exports.default = Authorization;