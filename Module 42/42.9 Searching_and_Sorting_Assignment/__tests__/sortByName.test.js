const sortByName = require("../src/sortByName");

describe("SortByName", () => {
  it("should sort by last name", () => {
    const input = [
      { firstName: "a", lastName: "b" },
      { firstName: "a", lastName: "a" },
      { firstName: "a", lastName: "c" },
    ];
    const expected = [
      { firstName: "a", lastName: "a" },
      { firstName: "a", lastName: "b" },
      { firstName: "a", lastName: "c" },
    ];
    expect(sortByName(input)).toEqual(expected);
  });
  it("should sort by first and last name", () => {
    const input = [
      { firstName: "b", lastName: "c" },
      { firstName: "a", lastName: "b" },
      { firstName: "a", lastName: "a" },
      { firstName: "b", lastName: "b" },
      { firstName: "c", lastName: "b" },
      { firstName: "a", lastName: "c" },
    ];
    const expected = [
      { firstName: "a", lastName: "a" },
      { firstName: "a", lastName: "b" },
      { firstName: "b", lastName: "b" },
      { firstName: "c", lastName: "b" },
      { firstName: "a", lastName: "c" },
      { firstName: "b", lastName: "c" },
    ];
    expect(sortByName(input)).toEqual(expected);
  });
});
