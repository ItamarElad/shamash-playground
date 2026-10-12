import { test } from "node:test";
import assert from "node:assert/strict";
import { isFree } from "../src/loans.js";

const d = (s, t = "12:00:00") => new Date(`${s}T${t}`);

test("isFree is true when returned before the due date", () => {
  assert.strictEqual(isFree(d("2024-03-10"), d("2024-03-05")), true);
});

test("isFree is true when returned on the due day, any time of day", () => {
  assert.strictEqual(isFree(d("2024-03-10", "08:00:00"), d("2024-03-10", "20:00:00")), true);
});

test("isFree is false one day late", () => {
  assert.strictEqual(isFree(d("2024-03-10"), d("2024-03-11")), false);
});

test("isFree is false when the fee is capped", () => {
  assert.strictEqual(isFree(d("2024-03-01"), d("2024-04-10")), false);
});
