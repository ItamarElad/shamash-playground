import { test } from "node:test";
import assert from "node:assert/strict";
import { isLate, lateFee } from "../src/loans.js";

test("returned on the due date is not late", () => {
  assert.equal(isLate(new Date("2026-01-10T12:00:00"), new Date("2026-01-10T12:00:00")), false);
});

test("same day at a different time is not late", () => {
  assert.equal(isLate(new Date("2026-01-10T12:00:00"), new Date("2026-01-10T18:00:00")), false);
});

test("returned a day after the due date is late", () => {
  assert.equal(isLate(new Date("2026-01-10T12:00:00"), new Date("2026-01-11T12:00:00")), true);
});

test("late fee: 0 on due date, 2 for one day late", () => {
  assert.equal(lateFee(new Date("2026-01-10T12:00:00"), new Date("2026-01-10T12:00:00")), 0);
  assert.equal(lateFee(new Date("2026-01-10T12:00:00"), new Date("2026-01-11T12:00:00")), 2);
});
