import { test } from "node:test";
import assert from "node:assert/strict";
import { isLate, lateFee } from "../src/loans.js";
import { lateLoans } from "../src/report.js";

const at = (s, h = 12) => new Date(`${s}T${String(h).padStart(2, "0")}:00:00`);
const loan = (customer, due, returned) => ({
  customer,
  book: "b-" + customer,
  dueDate: due,
  returnedDate: returned,
});

test("lateLoans keeps only late loans, in original order", () => {
  const loans = [
    loan("a", at("2026-01-10"), at("2026-01-12")),
    loan("b", at("2026-01-10"), at("2026-01-10", 20)),
    loan("c", at("2026-01-10"), at("2026-01-08")),
    loan("d", at("2026-01-10"), at("2026-01-11", 1)),
    loan("e", at("2026-01-10"), at("2026-02-10")),
  ];
  const result = lateLoans(loans);
  assert.deepEqual(result.map((l) => l.customer), ["a", "d", "e"]);
});

test("lateLoans excludes a same-day return at a later hour", () => {
  const loans = [loan("x", at("2026-03-05", 8), at("2026-03-05", 23))];
  assert.deepEqual(lateLoans(loans), []);
});

test("lateLoans of an empty array is []", () => {
  assert.deepEqual(lateLoans([]), []);
});

test("lateLoans returns a new array and does not change the input", () => {
  const loans = [
    loan("a", at("2026-01-10"), at("2026-01-12")),
    loan("b", at("2026-01-10"), at("2026-01-09")),
  ];
  const copy = [...loans];
  const result = lateLoans(loans);
  assert.notEqual(result, loans);
  assert.deepEqual(loans, copy);
  assert.equal(loans.length, 2);
  assert.equal(loans[0], copy[0]);
});

test("isLate is false on the same day and true on the next day", () => {
  assert.equal(isLate(at("2026-01-10", 8), at("2026-01-10", 22)), false);
  assert.equal(isLate(at("2026-01-10"), at("2026-01-11")), true);
});

test("lateFee is unchanged: 0 same day/early, 2 per day, cap 30", () => {
  assert.equal(lateFee(at("2026-01-10"), at("2026-01-10", 20)), 0);
  assert.equal(lateFee(at("2026-01-10"), at("2026-01-09")), 0);
  assert.equal(lateFee(at("2026-01-10"), at("2026-01-13")), 6);
  assert.equal(lateFee(at("2026-01-10"), at("2026-03-10")), 30);
});
