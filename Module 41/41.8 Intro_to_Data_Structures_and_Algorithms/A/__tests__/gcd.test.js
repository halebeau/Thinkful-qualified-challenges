const { gcd1, gcd2 } = require("../src/gcd");

describe("Greatest Common Divisor", () => {
  describe("Algorithm 1", () => {
    it("should work when a = 0", () => {
      expect(gcd1(0, 10)).toEqual(10);
    });
    it("should work when b = 0", () => {
      expect(gcd1(10, 0)).toEqual(10);
    });
    it("should work for 2 primes", () => {
      expect(gcd1(11, 13)).toEqual(1);
    });
    it("should work when a is larger", () => {
      expect(gcd1(36, 27)).toEqual(9);
    });
    it("should work when b is larger", () => {
      expect(gcd1(27, 36)).toEqual(9);
    });
    it("should work for same numbers", () => {
      expect(gcd1(20, 20)).toEqual(20);
    });
    it("should work when b = 1", () => {
      expect(gcd1(10, 1)).toEqual(1);
    });

    describe("The running time", () => {
      it("should take <100000n to calculate gcd(997, 499)", () => {
        const start = process.hrtime.bigint();
        gcd1(997, 499);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `GCD Algorithm 1 took ${runningTime} nanoseconds to calculate gcd(997, 499)`
        );
        expect(runningTime).toBeLessThan(100000);
      });
      it("should take <1000000n to calculate gcd(999983, 499979)", () => {
        const start = process.hrtime.bigint();
        gcd1(999983, 499979);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `GCD Algorithm 1 took ${runningTime} nanoseconds to calculate gcd(999983, 499979)`
        );
        expect(runningTime).toBeLessThan(1000000);
      });
      it("should take <100,000,000n to calculate(9999991, 5000011)", () => {
        const start = process.hrtime.bigint();
        gcd1(9999991, 5000011);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `GCD Algorithm 1 took ${runningTime} nanoseconds to calculate gcd(9999991, 5000011)`
        );
        expect(runningTime).toBeLessThan(100000000);
      });
    });
  });

  describe("Algorithm 2", () => {
    it("should work when a = 0", () => {
      expect(gcd2(0, 10)).toEqual(10);
    });
    it("should work when b = 0", () => {
      expect(gcd2(10, 0)).toEqual(10);
    });
    it("should work for 2 primes", () => {
      expect(gcd2(11, 13)).toEqual(1);
    });
    it("should work when a is larger", () => {
      expect(gcd2(36, 27)).toEqual(9);
    });
    it("should work when b is larger", () => {
      expect(gcd2(27, 36)).toEqual(9);
    });
    it("should work for same numbers", () => {
      expect(gcd2(20, 20)).toEqual(20);
    });
    it("should work when b = 1", () => {
      expect(gcd2(10, 1)).toEqual(1);
    });

    describe("The running time", () => {
      it("should take <1000000n to calculate gcd(997, 499)", () => {
        const start = process.hrtime.bigint();
        gcd2(997, 499);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `GCD Algorithm 2 took ${runningTime} nanoseconds to calculate gcd(997, 499)`
        );
        expect(runningTime).toBeLessThan(1000000);
      });
      it("should take <10000000n to calculate gcd(999983, 499979)", () => {
        const start = process.hrtime.bigint();
        gcd2(999983, 499979);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `GCD Algorithm 2 took ${runningTime} nanoseconds to calculate gcd(999983, 499979)`
        );
        expect(runningTime).toBeLessThan(100000000);
      });
      it("should take <100,000,000n to calculate(9999991, 5000011)", () => {
        const start = process.hrtime.bigint();
        gcd2(9999991, 5000011);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `GCD Algorithm 2 took ${runningTime} nanoseconds to calculate gcd(9999991, 5000011)`
        );
        expect(runningTime).toBeLessThan(100000000);
      });
    });
  });
});
