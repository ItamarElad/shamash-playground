import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidMemberId } from "../src/members.js";

test("valid member ids", () => {
  assert.equal(isValidMemberId("123456"), true);
  assert.equal(isValidMemberId("900000"), true);
});

test("invalid strings", () => {
  for (const s of ["012345", "12345", "1234567", "12a456", " 123456", "123456 ", "123 456", "", "123456\n", "١٢٣٤٥٦"]) {
    assert.equal(isValidMemberId(s), false, JSON.stringify(s));
  }
});

test("non-strings return false without throwing", () => {
  for (const v of [123456, null, undefined, [], {}, ["123456"]]) {
    assert.equal(isValidMemberId(v), false);
  }
});
