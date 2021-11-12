const binary = require("../src/binary");

describe("Binary", () => {
  it("should generate 1 number", () => {
    expect(binary(1)).toEqual(["1"]);
  });

  it("should generate 2 numbers", () => {
    expect(binary(2)).toEqual(["1", "10"]);
  });

  it("should generate 5 numbers", () => {
    expect(binary(5)).toEqual(["1", "10", "11", "100", "101"]);
  });
});
