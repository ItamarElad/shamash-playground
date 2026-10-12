import { test } from "node:test";
import assert from "node:assert/strict";
import { lateFee } from "../src/loans.js";

const d = (s) => new Date(`${s}T12:00:00`);

test("club member gets 50% off the late fee", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-06"), true), 5);
});

test("non-member pays the full late fee", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-06"), false), 10);
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-06")), 10);
});

test("member discount applies on top of the cap", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-03-01"), true), 15);
});

test("member returning early pays nothing", () => {
  assert.equal(lateFee(d("2026-01-10"), d("2026-01-08"), true), 0);
});
