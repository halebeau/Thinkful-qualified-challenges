const { splitSum1, splitSum2 } = require("../src/splitSum");

describe("The Split Sum problem", () => {
  describe("Algorithm 1", () => {
    it("should work for equal elements", () => {
      expect(splitSum1([2, 2, 2, 2])).toEqual(0);
    });

    it("should work for uneven split", () => {
      expect(splitSum1([2, 2, 2, 2, 8])).toEqual(0);
    });

    it("should work for reverse uneven split", () => {
      expect(splitSum1([8, 2, 2, 2, 2])).toEqual(0);
    });

    it("should work for random numbers", () => {
      expect(splitSum1([4, 12, 17, 8, 13, 24, 9])).toEqual(5);
    });

    describe("The running time", () => {
      it("should take <100000n to sum 100 numbers", () => {
        const numbers = Array(100)
          .fill(0)
          .map((_, i) => Math.floor(Math.random() * 100));
        const start = process.hrtime.bigint();
        splitSum1(numbers);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Split Sum Algorithm 1 took ${runningTime} nanoseconds to sum 100 numbers`
        );
        expect(runningTime).toBeLessThan(100000);
      });
      it("should take <1000000n to sum  1,000 numbers", () => {
        const numbers = Array(1000)
          .fill(0)
          .map((_, i) => Math.floor(Math.random() * 100));
        const start = process.hrtime.bigint();
        splitSum1(numbers);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Split Sum Algorithm 1 took ${runningTime} nanoseconds to sum 1000 numbers`
        );
        expect(runningTime).toBeLessThan(1000000);
      });
      it("should take <100,000,000n to sum  10,000 numbers", () => {
        const numbers = Array(10000)
          .fill(0)
          .map((_, i) => Math.floor(Math.random() * 100));
        const start = process.hrtime.bigint();
        splitSum1(numbers);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Split Sum Algorithm 1 took ${runningTime} nanoseconds to sum 10,000 numbers`
        );
        expect(runningTime).toBeLessThan(100000000);
      });
    });
  });

  describe("Algorithm 2", () => {
    it("should work for equal elements", () => {
      expect(splitSum2([2, 2, 2, 2])).toEqual(0);
    });

    it("should work for uneven split", () => {
      expect(splitSum2([2, 2, 2, 2, 8])).toEqual(0);
    });

    it("should work for reverse uneven split", () => {
      expect(splitSum2([8, 2, 2, 2, 2])).toEqual(0);
    });

    it("should work for random numbers", () => {
      expect(splitSum2([4, 12, 17, 8, 13, 24, 9])).toEqual(5);
    });

    describe("The running time", () => {
      it("should take <1000000n to sum 100 numbers", () => {
        const numbers = Array(100)
          .fill(0)
          .map((_, i) => Math.floor(Math.random() * 100));
        const start = process.hrtime.bigint();
        splitSum2(numbers);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Split Sum Algorithm 2 took ${runningTime} nanoseconds to sum 100 numbers`
        );
        expect(runningTime).toBeLessThan(1000000);
      });
      it("should take <100000000n to sum  1,000 numbers", () => {
        const numbers = Array(1000)
          .fill(0)
          .map((_, i) => Math.floor(Math.random() * 100));
        const start = process.hrtime.bigint();
        splitSum2(numbers);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Split Sum Algorithm 2 took ${runningTime} nanoseconds to sum 1000 numbers`
        );
        expect(runningTime).toBeLessThan(100000000);
      });
      it("should take <10,000,000,000n to sum  10,000 numbers", () => {
        const numbers = Array(10000)
          .fill(0)
          .map((_, i) => Math.floor(Math.random() * 100));
        const start = process.hrtime.bigint();
        splitSum2(numbers);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Split Sum Algorithm 2 took ${runningTime} nanoseconds to sum 10,000 numbers`
        );
        expect(runningTime).toBeLessThan(10000000000);
      });
    });
  });
});
