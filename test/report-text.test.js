import { test } from "node:test";
import assert from "node:assert/strict";
import { feesByCustomer, reportText } from "../src/report.js";

const day = (n) => new Date(2026, 0, n, 12);
// fee = 2 * daysLate
const loan = (customer, daysLate) => ({
  customer,
  book: "b",
  dueDate: day(1),
  returnedDate: day(1 + daysLate),
});

test("feesByCustomer sums late fees per customer, omits non-late customers", () => {
  const loans = [loan("דנה", 1), loan("יוסי", 1), loan("דנה", 2), loan("רן", 0), loan("שי", -3)];
  assert.deepEqual(feesByCustomer(loans), { "דנה": 6, "יוסי": 2 });
});

test("feesByCustomer caps each loan at 30, not the customer total", () => {
  assert.deepEqual(feesByCustomer([loan("א", 40), loan("א", 20)]), { "א": 60 });
});

test("feesByCustomer returns {} for empty or no late loans, without mutating input", () => {
  assert.deepEqual(feesByCustomer([]), {});
  const input = [loan("א", 0), loan("ב", -2)];
  const copy = [...input];
  assert.deepEqual(feesByCustomer(input), {});
  assert.deepEqual(input, copy);
});

test("reportText lists customers by fee desc with total line", () => {
  const loans = [loan("יוסי", 1), loan("דנה", 1), loan("דנה", 2)];
  assert.equal(reportText(loans), 'דנה: 6\nיוסי: 2\nסה"כ: 8');
});

test("reportText keeps first-appearance order on equal fees", () => {
  const loans = [loan("ב", 2), loan("א", 2), loan("ג", 5)];
  assert.equal(reportText(loans), 'ג: 10\nב: 4\nא: 4\nסה"כ: 18');
});

test("reportText with no late loans returns אין איחורים", () => {
  assert.equal(reportText([]), "אין איחורים");
  assert.equal(reportText([loan("א", 0), loan("ב", -1)]), "אין איחורים");
});
