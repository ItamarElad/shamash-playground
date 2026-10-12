import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidIsbn10 } from "../src/isbn.js";

test("valid ISBN-10 values", () => {
  assert.equal(isValidIsbn10("0306406152"), true);
  assert.equal(isValidIsbn10("0-306-40615-2"), true);
  assert.equal(isValidIsbn10("0 306 40615 2"), true);
  assert.equal(isValidIsbn10("080442957X"), true);
  assert.equal(isValidIsbn10("080442957x"), true);
});

test("invalid ISBN-10 values", () => {
  assert.equal(isValidIsbn10("0306406153"), false);
  assert.equal(isValidIsbn10("030640615"), false);
  assert.equal(isValidIsbn10("03064061520"), false);
  assert.equal(isValidIsbn10("X306406152"), false);
  assert.equal(isValidIsbn10("03064X6152"), false);
  assert.equal(isValidIsbn10("030640615A"), false);
  assert.equal(isValidIsbn10(""), false);
});

test("non-strings return false without throwing", () => {
  for (const v of [null, undefined, 12345, 306406152, {}, []]) {
    assert.equal(isValidIsbn10(v), false);
  }
});
