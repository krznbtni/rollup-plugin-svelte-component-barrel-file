import { describe, it, assert } from "vitest";
import { helloWorld, goodBye } from "./index";

describe("Hello World Function", () => {
  it("should be a function", () => {
    assert.isFunction(helloWorld);
  });

  it("should return the hello world message", () => {
    const expected = "Hello World from my example modern npm package!";
    const actual = helloWorld();
    assert.equal(actual, expected);
  });
});

describe("Goodbye Function", () => {
  it("should be a function", () => {
    assert.isFunction(goodBye);
  });

  it("should return the goodbye message", () => {
    const expected = "Goodbye from my example modern npm package!";
    const actual = goodBye();
    assert.equal(actual, expected);
  });
});
