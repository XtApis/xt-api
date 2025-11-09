"use strict";

var _postmanCollection = _interopRequireDefault(require("postman-collection"));
var _buildPostmanRequest = require("./buildPostmanRequest");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

describe("openApiQueryParams2PostmanQueryParams", () => {
  it("should transform empty array to empty array", () => {
    const expected = [];
    const actual = (0, _buildPostmanRequest.openApiQueryParams2PostmanQueryParams)([]);
    expect(actual).toStrictEqual(expected);
  });
  it("default to comma delimited", () => {
    const expected = [new _postmanCollection.default.QueryParam({
      key: "arrayParam",
      value: "abc,def"
    })];
    const actual = (0, _buildPostmanRequest.openApiQueryParams2PostmanQueryParams)([{
      name: "arrayParam",
      in: "query",
      value: ["abc", "def"]
    }]);
    expect(actual).toStrictEqual(expected);
  });
  it("should expand params if explode=true", () => {
    const expected = [new _postmanCollection.default.QueryParam({
      key: "arrayParam",
      value: "abc"
    }), new _postmanCollection.default.QueryParam({
      key: "arrayParam",
      value: "def"
    })];
    const actual = (0, _buildPostmanRequest.openApiQueryParams2PostmanQueryParams)([{
      name: "arrayParam",
      in: "query",
      style: "form",
      explode: true,
      value: ["abc", "def"]
    }]);
    expect(actual).toStrictEqual(expected);
  });
  it("should respect style=pipeDelimited", () => {
    const expected = [new _postmanCollection.default.QueryParam({
      key: "arrayParam",
      value: "abc|def"
    })];
    const actual = (0, _buildPostmanRequest.openApiQueryParams2PostmanQueryParams)([{
      name: "arrayParam",
      in: "query",
      style: "pipeDelimited",
      value: ["abc", "def"]
    }]);
    expect(actual).toStrictEqual(expected);
  });
  it("should respect style=spaceDelimited", () => {
    const expected = [new _postmanCollection.default.QueryParam({
      key: "arrayParam",
      value: "abc%20def"
    })];
    const actual = (0, _buildPostmanRequest.openApiQueryParams2PostmanQueryParams)([{
      name: "arrayParam",
      in: "query",
      style: "spaceDelimited",
      value: ["abc", "def"]
    }]);
    expect(actual).toStrictEqual(expected);
  });
});