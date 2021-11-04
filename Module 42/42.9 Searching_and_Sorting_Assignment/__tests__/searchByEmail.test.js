const searchByEmail = require("../src/searchByEmail");
const data = require("../src/data.json");

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
