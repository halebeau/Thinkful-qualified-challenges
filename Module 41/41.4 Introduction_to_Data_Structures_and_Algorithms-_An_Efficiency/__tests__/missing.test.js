const { beforeAll } = require("@jest/globals");
const { missing1, missing2 } = require("../src/missing");

function shuffle(A) {
  for (let i = A.length - 1; i >= 0; i--) {
    const r = Math.floor(Math.random() * A.length);
    const temp = A[r];
    A[r] = A[i];
    A[i] = temp;
  }
  return A;
}

describe("The missing number", () => {
  const numbers = [];
  beforeAll((done) => {
    const ns = [100, 1000, 10000];

    ns.forEach((n) => {
      const a = Array(n)
        .fill(0)
        .map((_, i) => i + 1);
      const shuffled = shuffle(a);

      numbers.push([shuffled[0], shuffled.slice(1)]);
      numbers.push([
        shuffled[shuffled.length - 1],
        shuffled.slice(0, shuffled.length - 1),
      ]);
      const removed = shuffled.splice(
        Math.floor(Math.random() * shuffled.length),
        1
      );
      numbers.push([removed[0], shuffled]);
    });
    console.log("Take a note of the following numbers");
    done();
  });

  describe("Algorithm 1", () => {
    describe("on 100 elements", () => {
      let m1, a1;
      let m2, a2;
      let m3, a3;
      beforeAll((done) => {
        [m1, a1] = numbers[0];
        [m2, a2] = numbers[1];
        [m3, a3] = numbers[2];
        done();
      });

      it(`Expects to find the missing in 100 numbers`, () => {
        expect(missing1(a1)).toEqual(m1);
      });

      it(`Expects to find the missing in 100 numbers`, () => {
        expect(missing1(a2)).toEqual(m2);
      });

      it(`Expects to find the missing in 100 numbers`, () => {
        expect(missing1(a3)).toEqual(m3);
      });
    });

    describe("on 100 elements", () => {
      let m1, a1;
      let m2, a2;
      let m3, a3;
      beforeAll((done) => {
        [m1, a1] = numbers[3];
        [m2, a2] = numbers[4];
        [m3, a3] = numbers[5];
        done();
      });

      it(`Expects to find the missing in 1000 numbers`, () => {
        expect(missing1(a1)).toEqual(m1);
      });

      it(`Expects to find the missing in 1000 numbers`, () => {
        expect(missing1(a2)).toEqual(m2);
      });

      it(`Expects to find the missing in 1000 numbers`, () => {
        expect(missing1(a3)).toEqual(m3);
      });
    });

    describe("on 10000 elements", () => {
      let m1, a1;
      let m2, a2;
      let m3, a3;
      beforeAll((done) => {
        [m1, a1] = numbers[6];
        [m2, a2] = numbers[7];
        [m3, a3] = numbers[8];
        done();
      });

      it(`Expects to find the missing in 10000 numbers`, () => {
        expect(missing1(a1)).toEqual(m1);
      });

      it(`Expects to find the missing in 10000 numbers`, () => {
        expect(missing1(a2)).toEqual(m2);
      });

      it(`Expects to find the missing in 10000 numbers`, () => {
        expect(missing1(a3)).toEqual(m3);
      });
    });

    describe("The running time", () => {
      const numbers = [];
      beforeAll((done) => {
        const ns = [100, 1000, 10000];

        ns.forEach((n) => {
          const a = Array(n)
            .fill(0)
            .map((_, i) => i + 1);

          const shuffled = shuffle(a);
          numbers.push([a[a.length - 1], shuffle(a.slice(0, a.length - 1))]);
        });
        done();
      });
      it("should take <300000n to search 100", () => {
        const start = process.hrtime.bigint();
        missing1(numbers[0][1]);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Missing Number Algorithm 1 took ${runningTime} nanoseconds to search 100 numbers`
        );
        expect(runningTime).toBeLessThan(300000);
      });
      it("should take <3000000n to search 1000 numbers", () => {
        const start = process.hrtime.bigint();
        missing1(numbers[1][1]);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Missing Number Algorithm 1 took ${runningTime} nanoseconds to search 1000 numbers`
        );
        expect(runningTime).toBeLessThan(3000000);
      });
      it("should take <200,000,000n to do 10000", () => {
        const start = process.hrtime.bigint();
        missing1(numbers[2][1]);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Missing Number Algorithm 1 took ${runningTime} nanoseconds to search 10000 numbers`
        );
        expect(runningTime).toBeLessThan(2000000000);
      });
    });
  });

  describe("Algorithm 2", () => {
    describe("on 100 elements", () => {
      let m1, a1;
      let m2, a2;
      let m3, a3;
      beforeAll((done) => {
        [m1, a1] = numbers[0];
        [m2, a2] = numbers[1];
        [m3, a3] = numbers[2];
        done();
      });

      it(`Expects ${m1} to be missing in 100 numbers`, () => {
        expect(missing2(a1)).toEqual(m1);
      });

      it(`Expects ${m2} to be missing in 100 numbers`, () => {
        expect(missing2(a2)).toEqual(m2);
      });

      it(`Expects ${m3} to be missing in 100 numbers`, () => {
        expect(missing2(a3)).toEqual(m3);
      });
    });

    describe("on 100 elements", () => {
      let m1, a1;
      let m2, a2;
      let m3, a3;
      beforeAll((done) => {
        [m1, a1] = numbers[3];
        [m2, a2] = numbers[4];
        [m3, a3] = numbers[5];
        done();
      });

      it(`Expects ${m1} to be missing in 1000 numbers`, () => {
        expect(missing2(a1)).toEqual(m1);
      });

      it(`Expects ${m2} to be missing in 1000 numbers`, () => {
        expect(missing2(a2)).toEqual(m2);
      });

      it(`Expects ${m3} to be missing in 1000 numbers`, () => {
        expect(missing2(a3)).toEqual(m3);
      });
    });

    describe("on 100000 elements", () => {
      let m1, a1;
      let m2, a2;
      let m3, a3;
      beforeAll((done) => {
        [m1, a1] = numbers[6];
        [m2, a2] = numbers[7];
        [m3, a3] = numbers[8];
        done();
      });

      it(`Expects ${m1} to be missing in 100000 numbers`, () => {
        expect(missing2(a1)).toEqual(m1);
      });

      it(`Expects ${m2} to be missing in 100000 numbers`, () => {
        expect(missing2(a2)).toEqual(m2);
      });

      it(`Expects ${m3} to be missing in 100000 numbers`, () => {
        expect(missing2(a3)).toEqual(m3);
      });
    });

    describe("The running time", () => {
      const numbers = [];
      beforeAll((done) => {
        const ns = [100, 1000, 10000];

        ns.forEach((n) => {
          const a = Array(n)
            .fill(0)
            .map((_, i) => i + 1);

          const shuffled = shuffle(a);
          numbers.push([a[a.length - 1], shuffle(a.slice(0, a.length - 1))]);
        });
        done();
      });
      it("should take <20,000n to search 100", () => {
        const start = process.hrtime.bigint();
        missing2(numbers[0][1]);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Missing Number Algorithm 2 took ${runningTime} nanoseconds to search 100 numbers`
        );
        expect(runningTime).toBeLessThan(20000);
      });
      it("should take <200,000n to search 1,000", () => {
        const start = process.hrtime.bigint();
        missing2(numbers[1][1]);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Missing Number Algorithm 2 took ${runningTime} nanoseconds to search 1,000 numbers`
        );
        expect(runningTime).toBeLessThan(200000);
      });
      it("should take <2,000,000n to search 10,000 numbers", () => {
        const start = process.hrtime.bigint();
        missing2(numbers[2][1]);
        const end = process.hrtime.bigint();
        const runningTime = end - start;
        console.log(
          `Missing Number Algorithm 2 took ${runningTime} nanoseconds to search 10,000 numbers`
        );
        expect(runningTime).toBeLessThan(2000000);
      });
    });
  });
});
