import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("the comment above lateFee is written in Hebrew", () => {
  const src = readFileSync(new URL("../src/loans.js", import.meta.url), "utf8");
  const m = src.match(/(\/\*\*[\s\S]*?\*\/)\s*export function lateFee\b/);
  assert.ok(m, "a doc comment must precede lateFee");
  assert.match(m[1], /[֐-׿]/);
  assert.doesNotMatch(m[1], /Late fee/);
});
