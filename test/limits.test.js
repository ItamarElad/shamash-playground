import { test } from "node:test";
import assert from "node:assert/strict";
import { canBorrow, MAX_ACTIVE_LOANS } from "../src/limits.js";

test("MAX_ACTIVE_LOANS is 3", () => {
  assert.equal(MAX_ACTIVE_LOANS, 3);
});

test("can borrow below the limit", () => {
  assert.equal(canBorrow(0), true);
  assert.equal(canBorrow(2), true);
});

test("cannot borrow at or above the limit", () => {
  assert.equal(canBorrow(3), false);
  assert.equal(canBorrow(5), false);
});
