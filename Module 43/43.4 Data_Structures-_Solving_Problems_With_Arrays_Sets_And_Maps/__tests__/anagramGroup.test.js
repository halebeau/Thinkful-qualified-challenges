const anagramGroups = require("../src/anagramGroups");

describe("Anagram groups", () => {
  it("no words should result in empty list", () => {
    expect(anagramGroups([])).toEqual([]);
  });

  it("no anagrams should result in single word lists", () => {
    expect(anagramGroups(["rain", "fire", "wind", "earth"])).toEqual([
      ["rain"],
      ["fire"],
      ["wind"],
      ["earth"],
    ]);
  });

  it("anagrams should result in groups of words", () => {
    expect(
      anagramGroups(["east", "cars", "acre", "arcs", "teas", "eats", "race"])
        .map((list) => list.sort())
        .sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))
    ).toEqual([
      ["acre", "race"],
      ["arcs", "cars"],
      ["east", "eats", "teas"],
    ]);
  });
});
