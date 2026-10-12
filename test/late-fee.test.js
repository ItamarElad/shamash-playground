import { test } from "node:test";
import assert from "node:assert/strict";
import { lateFee } from "../src/loans.js";

const d = (s) => new Date(`${s}T12:00:00`);

test("late fee is 10 per late day", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-02")), 10);
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-03")), 20);
});

test("late fee is capped at 30 after 3 days", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-04")), 30);
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-10")), 30);
});

test("no fee when returned on time", () => {
  assert.equal(lateFee(d("2026-01-05"), d("2026-01-01")), 0);
});
