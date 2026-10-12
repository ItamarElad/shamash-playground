import { test } from "node:test";
import assert from "node:assert/strict";
import { dueText } from "../src/dates.js";

const at = (y, m, d, h = 12, min = 0) => new Date(y, m - 1, d, h, min);

test("same day is היום, ignoring time", () => {
  assert.equal(dueText(at(2026, 5, 10), at(2026, 5, 10)), "היום");
  assert.equal(dueText(at(2026, 5, 10, 0, 1), at(2026, 5, 10, 23, 59)), "היום");
});

test("next day is מחר, even by a minute across midnight", () => {
  assert.equal(dueText(at(2026, 5, 11), at(2026, 5, 10)), "מחר");
  assert.equal(dueText(at(2026, 5, 11, 0, 1), at(2026, 5, 10, 23, 59)), "מחר");
});

test("future days", () => {
  assert.equal(dueText(at(2026, 5, 15), at(2026, 5, 10)), "בעוד 5 ימים");
  assert.equal(dueText(at(2027, 1, 2), at(2026, 12, 31)), "בעוד 2 ימים");
});

test("past days", () => {
  assert.equal(dueText(at(2026, 5, 9), at(2026, 5, 10)), "לפני 1 ימים");
  assert.equal(dueText(at(2026, 5, 7), at(2026, 5, 10)), "לפני 3 ימים");
});
