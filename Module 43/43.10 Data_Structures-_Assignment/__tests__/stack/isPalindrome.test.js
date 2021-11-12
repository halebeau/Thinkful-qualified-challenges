const isPalindrome = require("../../src/stack/isPalindrome");

describe("isPalindrome", () => {
  test.each([
    [" a ", true],
    ["", false],
    ["1001", true],
    ["\t", false],
    ["A man, a plan, a canal: Panama", true],
    ["A", true],
    ["aa", true],
    ["aza", true],
    ["canoe", false],
    ["kayak", true],
    ["😁", false],
  ])("%# '%s' returns %s", (text, expected) => {
    const actual = isPalindrome(text);
    expect(actual).toBe(expected);
  });
});
