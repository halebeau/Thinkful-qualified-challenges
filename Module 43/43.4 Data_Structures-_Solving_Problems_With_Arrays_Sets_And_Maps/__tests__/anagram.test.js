const anagram = require("../src/anagram");

describe("Anagram", () => {
  it("Empty string is an anagram of itself", () => {
    expect(anagram("", "")).toBe(true);
  });
  it("abc is an anagram of bca", () => {
    expect(anagram("abc", "bca")).toBe(true);
  });

  it("aac is an anagram of aca", () => {
    expect(anagram("aac", "aca")).toBe(true);
  });

  it("abca is not an anagram of bca", () => {
    expect(anagram("abca", "bca")).toBe(false);
  });

  it("abc is not an anagram of def", () => {
    expect(anagram("abc", "def")).toBe(false);
  });

  it("Abc is an anagram of bca", () => {
    expect(anagram("Abc", "bca")).toBe(true);
  });

  it("aaa is an anagram of aaa", () => {
    expect(anagram("aaa", "aaa")).toBe(true);
  });
});
