"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.openApiQueryParams2PostmanQueryParams = openApiQueryParams2PostmanQueryParams;
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _postmanCollection = _interopRequireDefault(require("postman-collection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

function endsWithHalfSurrogatePair(value) {
  if (value.length === 0) {
    return false;
  }
  const lastIndex = value.length - 1;
  const charCode = value.charCodeAt(lastIndex);
  // https://unicodebook.readthedocs.io/unicode_encodings.html#utf-16-surrogate-pairs
  // If ends with high surrogates string is invalid and encodeURIComponent fails
  // Only end checked for cases where surrogates input is sequential
  // We assume the user inputs a valid string but sequential write might temporarily
  // result in half a pair ending string
  if (charCode < 0xd800 || charCode > 0xdbff) {
    return false; // If any character is not a high surrogate, return false
  }
  return true;
}
function safeEncodeURIComponent(value) {
  if (typeof value === "string" && endsWithHalfSurrogatePair(value)) {
    return encodeURIComponent(value.slice(0, -1));
  }
  return encodeURIComponent(value);
}
function openApiQueryParams2PostmanQueryParams(queryParams) {
  let qp = [];
  for (const param of queryParams) {
    if (Array.isArray(param.value) && (param === null || param === void 0 ? void 0 : param.explode) === true) {
      for (const value of param.value) {
        qp.push({
          ...param,
          value
        });
      }
    } else {
      qp.push(param);
    }
  }
  return qp.map(param => {
    if (!param.value) {
      return undefined;
    }
    let delimiter = ",";
    if ((param === null || param === void 0 ? void 0 : param.style) === "spaceDelimited") {
      delimiter = "%20";
    } else if ((param === null || param === void 0 ? void 0 : param.style) === "pipeDelimited") {
      delimiter = "|";
    }
    if (Array.isArray(param.value)) {
      return new _postmanCollection.default.QueryParam({
        key: param.name,
        value: param.value.map(safeEncodeURIComponent).join(delimiter)
      });
    }

    // Parameter allows empty value: "/hello?extended"
    if (param.allowEmptyValue) {
      if (param.value === "true") {
        return new _postmanCollection.default.QueryParam({
          key: param.name,
          value: null
        });
      }
      return undefined;
    }
    return new _postmanCollection.default.QueryParam({
      key: param.name,
      value: safeEncodeURIComponent(param.value)
    });
  }).filter(item => item !== undefined);
}
function setQueryParams(postman, queryParams) {
  postman.url.query.clear();
  const qp = openApiQueryParams2PostmanQueryParams(queryParams);
  if (qp.length > 0) {
    postman.addQueryParams(qp);
  }
}
function setPathParams(postman, queryParams) {
  const recursiveEncodeURIComponent = c => Array.isArray(c) ? c.map(safeEncodeURIComponent) : safeEncodeURIComponent(c);
  const source = queryParams.map(param => {
    return new _postmanCollection.default.Variable({
      key: param.name,
      value: param.value ? recursiveEncodeURIComponent(param.value) : `:${param.name}`
    });
  });
  postman.url.variables.assimilate(source, false);
}
function buildCookie(cookieParams) {
  const cookies = cookieParams.map(param => {
    if (param.value && !Array.isArray(param.value)) {
      return new _postmanCollection.default.Cookie({
        // TODO: Is this right?
        path: "",
        domain: "",
        key: param.name,
        value: param.value
      });
    }
    return undefined;
  }).filter(item => item !== undefined);
  const list = new _postmanCollection.default.CookieList(null, cookies);
  return list.toString();
}
function setHeaders(postman, contentType, accept, cookie, headerParams, other) {
  postman.headers.clear();
  if (contentType) {
    postman.addHeader({
      key: "Content-Type",
      value: contentType
    });
  }
  if (accept) {
    postman.addHeader({
      key: "Accept",
      value: accept
    });
  }
  headerParams.forEach(param => {
    if (param.value && !Array.isArray(param.value)) {
      postman.addHeader({
        key: param.name,
        value: param.value
      });
    }
  });
  other.forEach(header => {
    postman.addHeader(header);
  });
  if (cookie) {
    postman.addHeader({
      key: "Cookie",
      value: cookie
    });
  }
}

// TODO: this is all a bit hacky
function setBody(clonedPostman, body) {
  var _body$content;
  if (clonedPostman.body === undefined) {
    return;
  }
  if (body.type === "empty") {
    clonedPostman.body = undefined;
    return;
  }
  if (body.type === "raw" && ((_body$content = body.content) === null || _body$content === void 0 ? void 0 : _body$content.type) === "file") {
    // treat it like file.
    clonedPostman.body.mode = "file";
    clonedPostman.body.file = {
      src: body.content.value.src
    };
    return;
  }
  switch (clonedPostman.body.mode) {
    case "raw":
      {
        var _body$content2, _body$content$value, _body$content3;
        // check file even though it should already be set from above
        if (body.type !== "raw" || ((_body$content2 = body.content) === null || _body$content2 === void 0 ? void 0 : _body$content2.type) === "file") {
          clonedPostman.body = undefined;
          return;
        }
        clonedPostman.body.raw = (_body$content$value = (_body$content3 = body.content) === null || _body$content3 === void 0 ? void 0 : _body$content3.value) !== null && _body$content$value !== void 0 ? _body$content$value : "";
        return;
      }
    case "formdata":
      {
        var _clonedPostman$body$f, _clonedPostman$body$f2;
        (_clonedPostman$body$f = clonedPostman.body.formdata) === null || _clonedPostman$body$f === void 0 ? void 0 : _clonedPostman$body$f.clear();
        if (body.type !== "form") {
          var _body$content4;
          // treat it like raw.
          clonedPostman.body.mode = "raw";
          clonedPostman.body.raw = `${(_body$content4 = body.content) === null || _body$content4 === void 0 ? void 0 : _body$content4.value}`;
          return;
        }
        const params = Object.entries(body.content).filter(entry => !!entry[1]).map(([key, content]) => {
          if (content.type === "file") {
            return new _postmanCollection.default.FormParam({
              key: key,
              ...content
            });
          }
          return new _postmanCollection.default.FormParam({
            key: key,
            value: content.value
          });
        });
        (_clonedPostman$body$f2 = clonedPostman.body.formdata) === null || _clonedPostman$body$f2 === void 0 ? void 0 : _clonedPostman$body$f2.assimilate(params, false);
        return;
      }
    case "urlencoded":
      {
        var _clonedPostman$body$u, _clonedPostman$body$u2;
        (_clonedPostman$body$u = clonedPostman.body.urlencoded) === null || _clonedPostman$body$u === void 0 ? void 0 : _clonedPostman$body$u.clear();
        if (body.type !== "form") {
          var _body$content5;
          // treat it like raw.
          clonedPostman.body.mode = "raw";
          clonedPostman.body.raw = `${(_body$content5 = body.content) === null || _body$content5 === void 0 ? void 0 : _body$content5.value}`;
          return;
        }
        const params = Object.entries(body.content).filter(entry => !!entry[1]).filter(([_key, content]) => content.type !== "array").map(([key, content]) => {
          if (content.type !== "file" && content.type !== "array" && content.value) {
            return new _postmanCollection.default.QueryParam({
              key: key,
              value: content.value
            });
          }
          return undefined;
        }).filter(item => item !== undefined);
        const arrayParams = Object.entries(body.content).filter(entry => !!entry[1]).filter(([_key, content]) => content.type === "array").map(([key, content]) => {
          if (content.type === "array" && content.value) {
            var _content$value, _content$value$value;
            return {
              key: key,
              values: (_content$value = content.value) === null || _content$value === void 0 ? void 0 : (_content$value$value = _content$value.value) === null || _content$value$value === void 0 ? void 0 : _content$value$value.map(e => new _postmanCollection.default.QueryParam({
                key: key,
                value: e
              }))
            };
          }
          return undefined;
        }).filter(item => item !== undefined && (item === null || item === void 0 ? void 0 : item.values) !== undefined);
        (_clonedPostman$body$u2 = clonedPostman.body.urlencoded) === null || _clonedPostman$body$u2 === void 0 ? void 0 : _clonedPostman$body$u2.assimilate(params, false);

        // Now let's append the array keys
        for (const arrayParam of arrayParams) {
          var _clonedPostman$body$u3, _arrayParam$values;
          (_clonedPostman$body$u3 = clonedPostman.body.urlencoded) === null || _clonedPostman$body$u3 === void 0 ? void 0 : _clonedPostman$body$u3.remove(e => e.key === (arrayParam === null || arrayParam === void 0 ? void 0 : arrayParam.key), undefined);
          arrayParam === null || arrayParam === void 0 ? void 0 : (_arrayParam$values = arrayParam.values) === null || _arrayParam$values === void 0 ? void 0 : _arrayParam$values.forEach(queryParam => {
            var _clonedPostman$body, _clonedPostman$body$u4;
            return (_clonedPostman$body = clonedPostman.body) === null || _clonedPostman$body === void 0 ? void 0 : (_clonedPostman$body$u4 = _clonedPostman$body.urlencoded) === null || _clonedPostman$body$u4 === void 0 ? void 0 : _clonedPostman$body$u4.append(queryParam);
          });
        }
        console.log(clonedPostman.body.urlencoded);
        return;
      }
    default:
      return;
  }
}

// TODO: finish these types

function buildPostmanRequest(postman, {
  queryParams,
  pathParams,
  cookieParams,
  contentType,
  accept,
  headerParams,
  body,
  server,
  auth
}) {
  const clonedPostman = (0, _cloneDeep.default)(postman);
  clonedPostman.url.protocol = undefined;
  clonedPostman.url.host = [window.location.origin];
  if (server) {
    let url = server.url.replace(/\/$/, "");
    const variables = server.variables;
    if (variables) {
      Object.keys(variables).forEach(variable => {
        url = url.replace(`{${variable}}`, variables[variable].storedValue);
      });
    }
    clonedPostman.url.host = [url];
  }
  setQueryParams(clonedPostman, queryParams);
  setPathParams(clonedPostman, pathParams);
  const cookie = buildCookie(cookieParams);
  let otherHeaders = [];
  let selectedAuth = [];
  if (auth.selected !== undefined) {
    selectedAuth = auth.options[auth.selected];
  }
  for (const a of selectedAuth) {
    // Bearer Auth
    if (a.type === "http" && a.scheme === "bearer") {
      const {
        token
      } = auth.data[a.key];
      if (token === undefined) {
        continue;
      }
      otherHeaders.push({
        key: "Authorization",
        value: `Bearer ${token}`
      });
      continue;
    }

    // Basic Auth
    if (a.type === "http" && a.scheme === "basic") {
      const {
        username,
        password
      } = auth.data[a.key];
      if (username === undefined || password === undefined) {
        continue;
      }
      otherHeaders.push({
        key: "Authorization",
        value: `Basic ${window.btoa(`${username}:${password}`)}`
      });
      continue;
    }
    if (a.type === "apiKey" && a.in === "header") {
      if (auth.data && auth.data[a.key]) {
        const value = auth.data[a.key][a.name];
        if (value) {
          otherHeaders.push({
            key: a.name,
            value
          });
        }
      }
    }
  }
  setHeaders(clonedPostman, contentType, accept, cookie, headerParams, otherHeaders);
  setBody(clonedPostman, body);
  return clonedPostman;
}
var _default = exports.default = buildPostmanRequest;