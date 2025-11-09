"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _toolkit = require("@reduxjs/toolkit");
var _FormItem = _interopRequireDefault(require("./../FormItem"));
var _FormMultiSelect = _interopRequireDefault(require("./../FormMultiSelect"));
var _FormSelect = _interopRequireDefault(require("./../FormSelect"));
var _FormTextInput = _interopRequireDefault(require("./../FormTextInput"));
var _slice = require("./slice");
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

function ParamOption({
  param
}) {
  var _param$schema, _param$schema$items, _param$schema2, _param$schema3, _param$schema4;
  if (((_param$schema = param.schema) === null || _param$schema === void 0 ? void 0 : _param$schema.type) === "array" && (_param$schema$items = param.schema.items) !== null && _param$schema$items !== void 0 && _param$schema$items.enum) {
    return <ParamMultiSelectFormItem param={param} />;
  }
  if (((_param$schema2 = param.schema) === null || _param$schema2 === void 0 ? void 0 : _param$schema2.type) === "array") {
    return <ParamArrayFormItem param={param} />;
  }
  if ((_param$schema3 = param.schema) !== null && _param$schema3 !== void 0 && _param$schema3.enum) {
    return <ParamSelectFormItem param={param} />;
  }
  if (((_param$schema4 = param.schema) === null || _param$schema4 === void 0 ? void 0 : _param$schema4.type) === "boolean") {
    return <ParamBooleanFormItem param={param} />;
  }

  // integer, number, string, int32, int64, float, double, object, byte, binary,
  // date-time, date, password
  return <ParamTextFormItem param={param} />;
}
function ParamOptionWrapper({
  param
}) {
  return <_FormItem.default label={param.name} type={param.in}>
      <ParamOption param={param} />
    </_FormItem.default>;
}
function ParamOptions() {
  const [showOptional, setShowOptional] = (0, _react.useState)(false);
  const pathParams = (0, _hooks.useTypedSelector)(state => state.params.path);
  const queryParams = (0, _hooks.useTypedSelector)(state => state.params.query);
  const cookieParams = (0, _hooks.useTypedSelector)(state => state.params.cookie);
  const headerParams = (0, _hooks.useTypedSelector)(state => state.params.header);
  const allParams = [...pathParams, ...queryParams, ...cookieParams, ...headerParams];
  const requiredParams = allParams.filter(p => p.required);
  const optionalParams = allParams.filter(p => !p.required);
  return <>
      {/* Required Parameters */}
      {requiredParams.map(param => <ParamOptionWrapper key={`${param.in}-${param.name}`} param={param} />)}

      {/* Optional Parameters */}
      {optionalParams.length > 0 && <>
          <button className={_stylesModule.default.showMoreButton} type="button" onClick={() => setShowOptional(prev => !prev)}>
            <span style={{
          width: "1.5em",
          display: "inline-block",
          textAlign: "center"
        }}>
              <span className={showOptional ? _stylesModule.default.plusExpanded : _stylesModule.default.plus}>
                <div>
                  <svg style={{
                fill: "currentColor",
                width: "10px",
                height: "10px"
              }} height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z" fillRule="evenodd"></path>
                  </svg>
                </div>
              </span>
            </span>
            {showOptional ? "Hide optional parameters" : "Show optional parameters"}
          </button>

          <div className={showOptional ? _stylesModule.default.showOptions : _stylesModule.default.hideOptions}>
            {optionalParams.map(param => <ParamOptionWrapper key={`${param.in}-${param.name}`} param={param} />)}
          </div>
        </>}
    </>;
}
function ArrayItem({
  param,
  onChange
}) {
  var _param$schema5, _param$schema5$items;
  if (((_param$schema5 = param.schema) === null || _param$schema5 === void 0 ? void 0 : (_param$schema5$items = _param$schema5.items) === null || _param$schema5$items === void 0 ? void 0 : _param$schema5$items.type) === "boolean") {
    return <_FormSelect.default options={["---", "true", "false"]} onChange={e => {
      const val = e.target.value;
      onChange(val === "---" ? undefined : val);
    }} />;
  }
  return <_FormTextInput.default placeholder={param.description || param.name} onChange={e => {
    onChange(e.target.value);
  }} />;
}
function ParamArrayFormItem({
  param
}) {
  var _param$schema7;
  const [items, setItems] = (0, _react.useState)([]);
  const dispatch = (0, _hooks.useTypedDispatch)();
  function handleAddItem() {
    var _param$schema6;
    if ((param === null || param === void 0 ? void 0 : (_param$schema6 = param.schema) === null || _param$schema6 === void 0 ? void 0 : _param$schema6.maxItems) !== undefined && items.length >= param.schema.maxItems) {
      return;
    }
    setItems(i => [...i, {
      id: (0, _toolkit.nanoid)()
    }]);
  }
  function updateItems(items) {
    const values = items.map(item => item.value).filter(item => !!item);
    dispatch((0, _slice.setParam)({
      ...param,
      value: values.length > 0 ? values : undefined
    }));
  }
  function handleDeleteItem(itemToDelete) {
    return () => {
      const newItems = items.filter(i => i.id !== itemToDelete.id);
      setItems(newItems);
      updateItems(newItems);
    };
  }
  function handleChangeItem(itemToUpdate) {
    return value => {
      const newItems = items.map(i => {
        if (i.id === itemToUpdate.id) {
          return {
            ...i,
            value: value
          };
        }
        return i;
      });
      setItems(newItems);
      updateItems(newItems);
    };
  }
  return <>
      {items.map(item => <div key={item.id} style={{
      display: "flex"
    }}>
          <ArrayItem param={param} onChange={handleChangeItem(item)} />
          <button className={_stylesModule.default.buttonDelete} type="button" onClick={handleDeleteItem(item)}>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
              <title>Delete</title>
            </svg>
          </button>
        </div>)}
      <button className={_stylesModule.default.buttonThin} type="button" onClick={handleAddItem} disabled={(param === null || param === void 0 ? void 0 : (_param$schema7 = param.schema) === null || _param$schema7 === void 0 ? void 0 : _param$schema7.maxItems) != null && items.length >= param.schema.maxItems}>
        Add item
      </button>
    </>;
}
function ParamSelectFormItem({
  param
}) {
  var _param$schema$enum, _param$schema8;
  const dispatch = (0, _hooks.useTypedDispatch)();
  const options = (_param$schema$enum = (_param$schema8 = param.schema) === null || _param$schema8 === void 0 ? void 0 : _param$schema8.enum) !== null && _param$schema$enum !== void 0 ? _param$schema$enum : [];
  return <_FormSelect.default options={["---", ...options]} onChange={e => {
    const val = e.target.value;
    dispatch((0, _slice.setParam)({
      ...param,
      value: val === "---" ? undefined : val
    }));
  }} />;
}
function ParamBooleanFormItem({
  param
}) {
  const dispatch = (0, _hooks.useTypedDispatch)();
  return <_FormSelect.default options={["---", "true", "false"]} onChange={e => {
    const val = e.target.value;
    dispatch((0, _slice.setParam)({
      ...param,
      value: val === "---" ? undefined : val
    }));
  }} />;
}
function ParamMultiSelectFormItem({
  param
}) {
  var _param$schema$items$e, _param$schema9, _param$schema9$items;
  const dispatch = (0, _hooks.useTypedDispatch)();
  const options = (_param$schema$items$e = (_param$schema9 = param.schema) === null || _param$schema9 === void 0 ? void 0 : (_param$schema9$items = _param$schema9.items) === null || _param$schema9$items === void 0 ? void 0 : _param$schema9$items.enum) !== null && _param$schema$items$e !== void 0 ? _param$schema$items$e : [];
  return <_FormMultiSelect.default options={options} onChange={e => {
    const values = Array.prototype.filter.call(e.target.options, o => o.selected).map(o => o.value);
    dispatch((0, _slice.setParam)({
      ...param,
      value: values.length > 0 ? values : undefined
    }));
  }} />;
}
function ParamTextFormItem({
  param
}) {
  const dispatch = (0, _hooks.useTypedDispatch)();
  return <_FormTextInput.default placeholder={param.description || param.name} onChange={e => dispatch((0, _slice.setParam)({
    ...param,
    value: e.target.value
  }))} />;
}
var _default = exports.default = ParamOptions;