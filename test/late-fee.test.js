import { test } from "node:test";
import assert from "node:assert/strict";
import { lateFee } from "../src/loans.js";

const d = (s) => new Date(`${s}T12:00:00`);

test("one day late costs a fee of 5", () => {
  assert.equal(lateFee(d("2026-01-01"), d("2026-01-02")), 5);
});
