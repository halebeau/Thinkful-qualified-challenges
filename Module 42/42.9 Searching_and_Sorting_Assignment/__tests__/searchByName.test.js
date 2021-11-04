const searchByName = require("../src/searchByName");
const data = require("../src/data.json");

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
