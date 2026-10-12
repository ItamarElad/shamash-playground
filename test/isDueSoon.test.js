import { test } from "node:test";
import assert from "node:assert/strict";
import * as loans from "../src/loans.js";

const d = (s, t = "12:00:00") => new Date(`${s}T${t}`);
const today = d("2026-01-10");

test("isDueSoon is true for today, tomorrow and the day after", () => {
  for (const s of ["2026-01-10", "2026-01-11", "2026-01-12"]) {
    assert.equal(loans.isDueSoon({ dueDate: d(s), returnedDate: null }, today), true, s);
  }
});

test("isDueSoon is false when overdue or 3+ days away", () => {
  for (const s of ["2026-01-09", "2026-01-01", "2026-01-13", "2026-02-01"]) {
    assert.equal(loans.isDueSoon({ dueDate: d(s), returnedDate: null }, today), false, s);
  }
});

test("isDueSoon is false when already returned", () => {
  assert.equal(loans.isDueSoon({ dueDate: d("2026-01-11"), returnedDate: d("2026-01-10") }, today), false);
});

test("isDueSoon treats null, undefined and missing returnedDate as not returned", () => {
  assert.equal(loans.isDueSoon({ dueDate: d("2026-01-11"), returnedDate: undefined }, today), true);
  assert.equal(loans.isDueSoon({ dueDate: d("2026-01-11") }, today), true);
});

test("isDueSoon compares by calendar day, ignoring time", () => {
  const late = d("2026-01-10", "23:00:00");
  assert.equal(loans.isDueSoon({ dueDate: d("2026-01-12", "08:00:00") }, late), true);
  assert.equal(loans.isDueSoon({ dueDate: d("2026-01-13", "00:30:00") }, late), false);
  assert.equal(loans.isDueSoon({ dueDate: d("2026-01-10", "00:30:00") }, late), true);
});

test("isDueSoon does not mutate its inputs", () => {
  const loan = { dueDate: d("2026-01-11"), returnedDate: null };
  const t = d("2026-01-10");
  loans.isDueSoon(loan, t);
  assert.equal(loan.dueDate.getTime(), d("2026-01-11").getTime());
  assert.equal(loan.returnedDate, null);
  assert.equal(t.getTime(), d("2026-01-10").getTime());
});
