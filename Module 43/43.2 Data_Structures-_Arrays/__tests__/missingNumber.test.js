const {
  missingNumberBruteForce,
  missingNumberSum,
} = require("../src/missingNumber");

describe("Missing Number", () => {
  let numbers = [];
  beforeAll(() => {
    numbers = Array.from(Array(100), (_, i) => i + 1);
  });
  describe("Brute force", () => {
    it("should find 1", () => {
      const nums = [...numbers];
      nums.splice(0, 1);
      expect(missingNumberBruteForce(nums)).toEqual(1);
    });

    it("should find 100", () => {
      const nums = [...numbers];
      nums.splice(99, 1);
      expect(missingNumberBruteForce(nums)).toEqual(100);
    });

    it("should find 50", () => {
      const nums = [...numbers];
      nums.splice(49);
      expect(missingNumberBruteForce(nums)).toEqual(50);
    });

    it("should find random missing number", () => {
      const nums = [...numbers];
      const ran = Math.floor(Math.random() * 100);
      nums.splice(ran);
      expect(missingNumberBruteForce(nums)).toEqual(ran + 1);
    });
  });

  describe("Using sum", () => {
    it("should find 1", () => {
      const nums = [...numbers];
      nums.splice(0, 1);
      expect(missingNumberSum(nums)).toEqual(1);
    });

    it("should find 100", () => {
      const nums = [...numbers];
      nums.splice(99, 1);
      expect(missingNumberSum(nums)).toEqual(100);
    });

    it("should find 50", () => {
      const nums = [...numbers];
      nums.splice(49);
      expect(missingNumberSum(nums)).toEqual(50);
    });

    it("should find random missing number", () => {
      const nums = [...numbers];
      const ran = Math.floor(Math.random() * 100);
      nums.splice(ran);
      expect(missingNumberSum(nums)).toEqual(ran + 1);
    });
  });
});
