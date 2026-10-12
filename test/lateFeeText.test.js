import { test } from "node:test";
import assert from "node:assert/strict";
import * as loans from "../src/loans.js";

const d = (s) => new Date(`${s}T12:00:00`);
const loan = (due, returned) => ({
  loanDate: d("2025-12-01"),
  dueDate: d(due),
  returnedDate: returned,
});

test("lateFeeText shows the fee with the shekel sign", () => {
  assert.equal(loans.lateFeeText(loan("2026-01-10", d("2026-01-13"))), "₪6");
});

test("lateFeeText shows the capped fee", () => {
  assert.equal(loans.lateFeeText(loan("2026-01-01", d("2026-03-01"))), "₪30");
});

test("lateFeeText says no fee when returned early or on the due day", () => {
  assert.equal(loans.lateFeeText(loan("2026-01-10", d("2026-01-08"))), "אין קנס");
  assert.equal(loans.lateFeeText(loan("2026-01-10", d("2026-01-10"))), "אין קנס");
});

test("lateFeeText throws when there is no returnedDate", () => {
  assert.throws(() => loans.lateFeeText(loan("2026-01-10", undefined)), Error);
  assert.throws(() => loans.lateFeeText(loan("2026-01-10", null)), Error);
  assert.throws(
    () => loans.lateFeeText({ loanDate: d("2025-12-01"), dueDate: d("2026-01-10") }),
    Error,
  );
});
