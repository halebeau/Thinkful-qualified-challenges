const sort = require("../src/sort");
const sortByName = require("../src/sortByName");
const searchByEmail = require("../src/searchByEmail");
const data = require("../src/data.json");
const searchByName = require("../src/searchByName");

describe("Search By Name", () => {
  let customers;
  beforeAll(() => {
    customers = [...data]
      .sort((a, b) => a.firstName.localeCompare(b.firstName))
      .sort((a, b) => a.lastName.localeCompare(b.lastName));
  });
  it("empty array return -1", () => {
    expect(searchByName("", "", [])).toEqual(-1);
  });
  it("should find existing name", () => {
    expect(searchByName("Alexandrine", "Kerluke", customers)).toEqual(64);
  });
  it("should return -1 for not found", () => {
    expect(searchByName("Fred", "Flintstone", customers)).toEqual(-1);
  });
});

describe("Search by Email", () => {
  it("should return -1 for empty array", () => {
    expect(searchByEmail("", [])).toEqual(-1);
  });
  it("should return index when email is found", () => {
    expect(searchByEmail("Roma_Halvorson@yahoo.com", data)).toEqual(199);
  });
  it("should return -1 when email is not found", () => {
    expect(searchByEmail("frodo.baggins@shire.com", data)).toEqual(-1);
  });
});

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
