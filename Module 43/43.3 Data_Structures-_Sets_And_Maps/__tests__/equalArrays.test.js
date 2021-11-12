const isEqual = require("../src/equalArrays");

describe("Equal Arrays", () => {
  it("should work for no repetition and equal", () => {
    expect(isEqual([20, 32, 12, 15], [15, 20, 12, 32])).toBe(true);
  });

  it("should work with repetition and equal", () => {
    expect(isEqual([20, 32, 12, 15, 20, 12], [12, 15, 12, 20, 32, 20])).toBe(
      true
    );
  });

  it("should return false when counts are different", () => {
    expect(isEqual([20, 32, 12, 15, 20, 12], [12, 15, 12, 32, 20])).toBe(false);
  });

  it("should return false with same length arrays and counts different", () => {
    expect(isEqual([20, 32, 20, 20], [32, 20, 32, 32])).toBe(false);
  });

  it("should find empty arrays are equal", () => {
    expect(isEqual([], [])).toBe(true);
  });
});
