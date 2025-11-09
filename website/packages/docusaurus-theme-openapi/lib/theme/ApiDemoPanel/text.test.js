"use strict";

var _text = require("./text");
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

describe("stripText function", () => {
  it("should return empty string when passed undefined", () => {
    expect((0, _text.stripText)(undefined)).toBe("");
  });
  it("should strip markdown", () => {
    expect((0, _text.stripText)("**This** description contains [markdown](https://www.markdownguide.org/)")).toBe("This description contains markdown");
  });
  it("should strip HTML", () => {
    expect((0, _text.stripText)('<strong>This</strong> description contains <a href="https://www.w3.org/html/">HTML</a>')).toBe("This description contains HTML");
  });
  it("should replace newlines with space", () => {
    expect((0, _text.stripText)("one\ntwo\n\nthree")).toBe("one two three");
  });
  it("should insert whitespace between HTML elements", () => {
    expect((0, _text.stripText)("<div><div>one</div></div><p>two</p><p>three</p><br />four")).toBe("one two three four");
  });
});