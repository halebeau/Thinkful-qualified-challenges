const {
  minimumAndMaximumIterate,
  minimumAndMaximumSort,
} = require("../src/minimumAndMaximum");

describe("Minimum and Maximum", () => {
  describe("Iteration", () => {
    it("should find the minimum and maximum", () => {
      expect(minimumAndMaximumIterate([8, 3, 7, 9, 4, 1, 2, 5, 6])).toEqual([
        1,
        9,
      ]);
    });

    it("should find the minimum and maximum if same", () => {
      expect(minimumAndMaximumIterate([5, 5, 5, 5, 5])).toEqual([5, 5]);
    });

    it("should return []for []", () => {
      expect(minimumAndMaximumIterate([])).toEqual([]);
    });

    it("should work for negative numbers", () => {
      expect(
        minimumAndMaximumIterate([-8, -3, -7, -9, -4, -1, -2, -5, -6])
      ).toEqual([-9, -1]);
    });
  });

  describe("Sorting", () => {
    it("should find the minimum and maximum", () => {
      expect(minimumAndMaximumSort([8, 3, 7, 9, 4, 1, 2, 5, 6])).toEqual([
        1,
        9,
      ]);
    });

    it("should find the minimum and maximum if same", () => {
      expect(minimumAndMaximumSort([5, 5, 5, 5, 5])).toEqual([5, 5]);
    });

    it("should return []for []", () => {
      expect(minimumAndMaximumSort([])).toEqual([]);
    });

    it("should work for negative numbers", () => {
      expect(
        minimumAndMaximumSort([-8, -3, -7, -9, -4, -1, -2, -5, -6])
      ).toEqual([-9, -1]);
    });
  });
});
