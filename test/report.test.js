import { test } from "node:test";
import assert from "node:assert/strict";
import { lateLoans } from "../src/report.js";

const loan = (customer, due, ret) => ({
  customer,
  book: "b",
  dueDate: new Date(due),
  returnedDate: new Date(ret),
});

test("lateLoans keeps only loans returned a full day or more after due date, in order, same objects", () => {
  const early = loan("a", "2026-01-10T12:00:00", "2026-01-08T12:00:00");
  const same = loan("b", "2026-01-10T08:00:00", "2026-01-10T23:59:00");
  const late1 = loan("c", "2026-01-10T23:00:00", "2026-01-11T00:30:00");
  const late2 = loan("d", "2026-01-01T12:00:00", "2026-02-01T12:00:00");
  const input = [late2, early, same, late1];
  const copy = [...input];
  const out = lateLoans(input);
  assert.equal(out.length, 2);
  assert.equal(out[0], late2);
  assert.equal(out[1], late1);
  assert.deepEqual(input, copy);
  assert.notEqual(out, input);
});

test("lateLoans of empty array is empty", () => {
  assert.deepEqual(lateLoans([]), []);
});
