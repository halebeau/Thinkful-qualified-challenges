const permutationPalindrome = require("../src/permutationPalindrome");

describe("Permutation Palindrome", () => {
  it("empty string is a palindrome", () => {
    expect(permutationPalindrome("")).toBe(true);
  });

  it("single character string is a palindrome", () => {
    expect(permutationPalindrome("a")).toBe(true);
  });

  it("single repeated character string is a palindrome", () => {
    expect(permutationPalindrome("aaaa")).toBe(true);
  });

  it("one odd frequency character string is a palindrome", () => {
    expect(permutationPalindrome("aaabbdd")).toBe(true);
  });

  it("more than one odd frequency character string is not a palindrome", () => {
    expect(permutationPalindrome("aaabbb")).toBe(false);
  });

  it("more than one odd frequency character + some even frequency characters string is not a palindrome", () => {
    expect(permutationPalindrome("aaabbbccdd")).toBe(false);
  });

  it("any number of even frequency character string is a palindrome", () => {
    expect(permutationPalindrome("aaaabbcccc")).toBe(true);
  });
});
