import { test } from "node:test";
import assert from "node:assert/strict";
import { isLate, lateFee } from "../src/loans.js";

const d = (s) => new Date(`${s}T12:00:00`);

test("a book returned on the due date is not late", () => {
  assert.equal(isLate(d("2026-01-10"), d("2026-01-10")), false);
});

test("no late fee when returned on the due date", () => {
  assert.equal(lateFee(d("2026-01-10"), d("2026-01-10")), 0);
});

test("a book returned one day after the due date is late and costs 2", () => {
  assert.equal(isLate(d("2026-01-10"), d("2026-01-11")), true);
  assert.equal(lateFee(d("2026-01-10"), d("2026-01-11")), 2);
});
