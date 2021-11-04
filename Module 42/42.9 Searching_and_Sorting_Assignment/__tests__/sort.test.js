const sort = require("../src/sort");

describe("Sort", () => {
  it("should sort the empty array", () => {
    expect(sort(() => {}, [])).toEqual([]);
  });
  it("should sort the singleton array", () => {
    expect(sort(() => {}, [1])).toEqual([1]);
  });
  it("should sort an array of numbers in ascending order", () => {
    expect(sort((a, b) => a - b, [3, 2, 4, 5, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("should sort an array of numbers in descending order", () => {
    expect(sort((a, b) => b - a, [3, 2, 4, 5, 1])).toEqual([5, 4, 3, 2, 1]);
  });
  it("should be a stable sort", () => {
    const input = [
      { firstName: "b", lastName: "c" },
      { firstName: "a", lastName: "b" },
      { firstName: "a", lastName: "a" },
      { firstName: "c", lastName: "b" },
      { firstName: "b", lastName: "b" },
      { firstName: "a", lastName: "c" },
    ];
    const expected = [
      { firstName: "a", lastName: "a" },
      { firstName: "a", lastName: "b" },
      { firstName: "c", lastName: "b" },
      { firstName: "b", lastName: "b" },
      { firstName: "b", lastName: "c" },
      { firstName: "a", lastName: "c" },
    ];
    expect(sort((a, b) => a.lastName.localeCompare(b.lastName), input)).toEqual(
      expected
    );
  });
});
