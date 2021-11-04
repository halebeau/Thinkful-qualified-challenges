const fibonacci = require("../src/fibonacci");

describe("Fibonacci", () => {
  it("should return base case 0", () => {
    expect(fibonacci(0)).toEqual(0);
  });

  it("should return base case 1", () => {
    expect(fibonacci(1)).toEqual(1);
  });

  it("should return 7th fibonacci number", () => {
    expect(fibonacci(7)).toEqual(13);
  });

  it("should return the nth fibonacci number", () => {
    const sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    const ran = Math.floor(Math.random() * sequence.length);
    expect(fibonacci(ran)).toEqual(sequence[ran]);
  });
});

