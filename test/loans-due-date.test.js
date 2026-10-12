import { test } from "node:test";
import assert from "node:assert/strict";
import { isLate, lateFee } from "../src/loans.js";

test("returned on the due date is not late, even later in the day", () => {
  const due = new Date("2026-01-10T09:00:00");
  const returned = new Date("2026-01-10T18:00:00");
  assert.equal(isLate(due, returned), false);
  assert.equal(lateFee(due, returned), 0);
});

test("returned one day after the due date is late with fee 2", () => {
  const due = new Date("2026-01-10T12:00:00");
  const returned = new Date("2026-01-11T12:00:00");
  assert.equal(isLate(due, returned), true);
  assert.equal(lateFee(due, returned), 2);
});

test("late fee stays capped at 30", () => {
  assert.equal(
    lateFee(new Date("2026-01-01T12:00:00"), new Date("2026-03-01T12:00:00")),
    30
  );
});
