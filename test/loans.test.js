import { test } from "node:test";
import assert from "node:assert/strict";
import { daysBetween, isLate, lateFee } from "../src/loans.js";

const d = (s) => new Date(`${s}T12:00:00`);

test("daysBetween counts whole days", () => {
  assert.equal(daysBetween(d("2026-01-01"), d("2026-01-04")), 3);
});

test("a book returned early is not late", () => {
  assert.equal(isLate(d("2026-01-10"), d("2026-01-08")), false);
});

test("late fee is capped at 30", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-03-01")), 30);
});

test("late fee is 2 per late day", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-02")), 2);
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-03")), 4);
});

test("late fee is capped at 5", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-04")), 5);
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-21")), 5);
});
