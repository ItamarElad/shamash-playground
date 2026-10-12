import { test } from "node:test";
import assert from "node:assert/strict";
import * as loans from "../src/loans.js";

const d = (s, t = "12:00:00") => new Date(`${s}T${t}`);
const loan = (extra) => ({ loanDate: d("2026-01-01"), dueDate: d("2026-01-08"), ...extra });

test("loanDays counts days from loan to return", () => {
  assert.equal(loans.loanDays(loan({ returnedDate: d("2026-01-11") })), 10);
});

test("loanDays is 0 on the same day, ignoring time of day", () => {
  assert.equal(
    loans.loanDays({ loanDate: d("2026-01-01", "08:00:00"), dueDate: d("2026-01-08"), returnedDate: d("2026-01-01", "22:00:00") }),
    0
  );
});

test("loanDays throws when returnedDate is missing", () => {
  assert.throws(() => loans.loanDays(loan({})), Error);
  assert.throws(() => loans.loanDays(loan({ returnedDate: undefined })), Error);
  assert.throws(() => loans.loanDays(loan({ returnedDate: null })), Error);
});
