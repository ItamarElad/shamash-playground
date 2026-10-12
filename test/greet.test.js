import { test } from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/greet.js";

test("greet prefixes the name with a greeting", () => {
  assert.equal(greet("דנה"), "שלום, דנה");
  assert.equal(greet("Avi"), "שלום, Avi");
});

test("greet with an empty name returns just the greeting", () => {
  assert.equal(greet(""), "שלום");
});

test("greet with a missing name returns just the greeting", () => {
  assert.equal(greet(), "שלום");
  assert.equal(greet(null), "שלום");
});

test("greet does not trim the name", () => {
  assert.equal(greet(" דנה "), "שלום,  דנה ");
});
