const firstSingleCharacter = require("../src/firstSingleCharacter");

describe("First Single Character", () => {
  it("empty string has no single characters", () => {
    expect(firstSingleCharacter("")).toBeNull();
  });
  it("one character string has one single characters", () => {
    expect(firstSingleCharacter("a")).toEqual("a");
  });
  it("multi character string with one single characters", () => {
    expect(firstSingleCharacter("abacbdabc")).toEqual("d");
  });
  it("multi character string with no single characters", () => {
    expect(firstSingleCharacter("abadcbdabc")).toBeNull();
  });

  it("multi character string with multiple single characters", () => {
    expect(firstSingleCharacter("abaecbdabcabcfabcdbc")).toEqual("e");
  });
});
