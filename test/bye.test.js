import { test } from "node:test";
import assert from "node:assert/strict";
import { bye } from "../src/bye.js";

test("bye greets a Hebrew name", () => {
  assert.equal(bye("דנה"), "להתראות, דנה");
});

test("bye keeps the name as is", () => {
  assert.equal(bye("Bob"), "להתראות, Bob");
  assert.equal(bye(" bob "), "להתראות,  bob ");
});

test("bye with empty name", () => {
  assert.equal(bye(""), "להתראות, ");
});
