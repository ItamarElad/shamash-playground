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

test("a book returned on the due day is not late", () => {
  assert.equal(isLate(d("2026-01-10"), d("2026-01-10")), false);
  assert.equal(lateFee(d("2026-01-10"), d("2026-01-10")), 0);
});

test("due day is not late even when returned at a later hour", () => {
  const due = new Date("2026-01-10T08:00:00");
  const returned = new Date("2026-01-10T20:00:00");
  assert.equal(isLate(due, returned), false);
  assert.equal(lateFee(due, returned), 0);
});

test("a book returned one day after the due day is late with fee 2", () => {
  assert.equal(isLate(d("2026-01-10"), d("2026-01-11")), true);
  assert.equal(lateFee(d("2026-01-10"), d("2026-01-11")), 2);
});

test("an early return has no fee", () => {
  assert.equal(lateFee(d("2026-01-10"), d("2026-01-08")), 0);
});
