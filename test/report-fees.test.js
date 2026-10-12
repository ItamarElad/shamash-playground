import { test } from "node:test";
import assert from "node:assert/strict";
import { feesByCustomer, reportText } from "../src/report.js";

const at = (s) => new Date(`${s}T12:00:00`);
const loan = (customer, due, returned) => ({
  customer,
  book: "b",
  dueDate: at(due),
  returnedDate: at(returned),
});
// days late helper
const late = (customer, days) =>
  loan(customer, "2026-01-01", `2026-01-${String(1 + days).padStart(2, "0")}`);
const onTime = (customer) => loan(customer, "2026-01-10", "2026-01-08");
const sameDay = (customer) => loan(customer, "2026-01-10", "2026-01-10");

test("feesByCustomer sums fees over several loans per customer", () => {
  const r = feesByCustomer([late("דנה", 1), late("יוסי", 1), late("דנה", 3)]);
  assert.deepEqual(r, { "דנה": 8, "יוסי": 2 });
});

test("feesByCustomer applies the cap per loan", () => {
  const r = feesByCustomer([late("א", 20), late("א", 20)]);
  assert.deepEqual(r, { "א": 60 });
});

test("feesByCustomer omits customers with only on-time loans", () => {
  const r = feesByCustomer([onTime("א"), sameDay("ב"), late("ג", 2), onTime("ג")]);
  assert.deepEqual(r, { "ג": 4 });
});

test("feesByCustomer returns {} for empty or no late loans", () => {
  assert.deepEqual(feesByCustomer([]), {});
  assert.deepEqual(feesByCustomer([onTime("א"), sameDay("ב")]), {});
});

test("reportText sorts descending and adds total", () => {
  const t = reportText([late("יוסי", 1), late("דנה", 3)]);
  assert.equal(t, 'דנה: 6\nיוסי: 2\nסה"כ: 8');
});

test("reportText keeps first-appearance order on ties", () => {
  const t = reportText([late("ב", 2), late("א", 2), late("ג", 5)]);
  assert.equal(t, 'ג: 10\nב: 4\nא: 4\nסה"כ: 18');
});

test("reportText with a single customer", () => {
  assert.equal(reportText([late("דנה", 2), late("דנה", 1)]), 'דנה: 6\nסה"כ: 6');
});

test("reportText with no late loans", () => {
  assert.equal(reportText([]), "אין איחורים");
  assert.equal(reportText([onTime("א"), sameDay("ב")]), "אין איחורים");
});
