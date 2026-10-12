import { test } from "node:test";
import assert from "node:assert/strict";
import { isLate, lateFee } from "../src/loans.js";

test("returned on the due day is not late and costs nothing", () => {
  const due = new Date("2026-01-10T09:00:00");
  const returned = new Date("2026-01-10T20:00:00");
  assert.equal(isLate(due, returned), false);
  assert.equal(lateFee(due, returned), 0);
});

test("returned one day after is late with fee 2", () => {
  const due = new Date("2026-01-10T12:00:00");
  const returned = new Date("2026-01-11T12:00:00");
  assert.equal(isLate(due, returned), true);
  assert.equal(lateFee(due, returned), 2);
});

test("fee is 2 per day and capped at 30", () => {
  const due = new Date("2026-01-01T12:00:00");
  assert.equal(lateFee(due, new Date("2026-01-04T12:00:00")), 6);
  assert.equal(lateFee(due, new Date("2026-01-16T12:00:00")), 30);
});
