import { test } from "node:test";
import assert from "node:assert/strict";
import * as loans from "../src/loans.js";

const d = (s) => new Date(`${s}T12:00:00`);

test("renewLoan moves dueDate forward and keeps other fields", () => {
  const loan = { id: 1, dueDate: d("2026-01-10"), returnedDate: null };
  const r = loans.renewLoan(loan, 5);
  assert.notEqual(r, loan);
  assert.notEqual(r.dueDate, loan.dueDate);
  assert.ok(r.dueDate instanceof Date);
  assert.equal(r.dueDate.getTime(), d("2026-01-15").getTime());
  assert.equal(r.id, 1);
  assert.equal(r.returnedDate, null);
});

test("renewLoan does not mutate the original", () => {
  const loan = { dueDate: d("2026-01-10") };
  loans.renewLoan(loan, 5);
  assert.equal(loan.dueDate.getTime(), d("2026-01-10").getTime());
});

test("renewLoan crosses month and year boundaries", () => {
  assert.equal(loans.renewLoan({ dueDate: d("2026-01-30") }, 3).dueDate.getTime(), d("2026-02-02").getTime());
  assert.equal(loans.renewLoan({ dueDate: d("2026-12-31") }, 1).dueDate.getTime(), d("2027-01-01").getTime());
});

test("renewLoan rejects invalid days", () => {
  for (const bad of [0, -1, 1.5, NaN, Infinity, "3", undefined, null]) {
    assert.throws(() => loans.renewLoan({ dueDate: d("2026-01-10") }, bad), Error);
  }
});
