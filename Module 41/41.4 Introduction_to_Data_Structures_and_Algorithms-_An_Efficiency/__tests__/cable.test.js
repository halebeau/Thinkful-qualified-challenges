const { cable1, cable2 } = require("../src/cable");

describe("The Cable problem", () => {
  describe("Algorithm 1", () => {
    it("should work for no steps", () => {
      expect(cable1(1, 1, 1)).toEqual(0);
    });

    it("should work for some steps", () => {
      expect(cable1(1, 10, 1)).toEqual(9);
    });

    it("should work for large steps", () => {
      expect(cable1(1, 10, 10)).toEqual(1);
    });

    describe("The running time", () => {
      it("should take <500000n to count 1000", () => {
        const start = process.hrtime.bigint();
        cable1(1, 1001, 1);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Cable Problem Algorithm 1 took ${runningTime} nanoseconds to count to 1000`
        );
        expect(runningTime).toBeLessThan(500000);
      });
      it("should take <5000000n to count 5,000", () => {
        const start = process.hrtime.bigint();
        cable1(1, 5001, 1);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Cable Problem Algorithm 1 took ${runningTime} nanoseconds to count to 5,000`
        );
        expect(runningTime).toBeLessThan(5000000);
      });
      it("should take <200,000,000n to count 10,000", () => {
        const start = process.hrtime.bigint();
        cable1(1, 10001, 1);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Cable Problem Algorithm 1 took ${runningTime} nanoseconds to count to 10,000`
        );
        expect(runningTime).toBeLessThan(200000000);
      });
    });
  });

  describe("Algorithm 2", () => {
    it("should work for no steps", () => {
      expect(cable2(1, 1, 1)).toEqual(0);
    });

    it("should work for some steps", () => {
      expect(cable2(1, 10, 1)).toEqual(9);
    });

    it("should work for large steps", () => {
      expect(cable2(1, 10, 10)).toEqual(1);
    });

    describe("The running time", () => {
      it("should take <200000n to count 1000", () => {
        const start = process.hrtime.bigint();
        cable2(1, 1001, 1);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Cable Problem Algorithm 2 took ${runningTime} nanoseconds to count to 1000`
        );
        expect(runningTime).toBeLessThan(200000);
      });
      it("should take <5000000n to count 5,000", () => {
        const start = process.hrtime.bigint();
        cable2(1, 5001, 1);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Cable Problem Algorithm 2 took ${runningTime} nanoseconds to count to 5,000`
        );
        expect(runningTime).toBeLessThan(5000000);
      });
      it("should take <200,000,000n to count 10,000", () => {
        const start = process.hrtime.bigint();
        cable2(1, 10001, 1);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Cable Problem Algorithm 2 took ${runningTime} nanoseconds to count to 10,000`
        );
        expect(runningTime).toBeLessThan(200000000);
      });
    });
  });
});
