const evaluate = require("../src/postfix");

describe("Postfix Evaluate", () => {
  it("should perform simple addition", () => {
    expect(evaluate("2 3 +")).toEqual(5);
  });

  it("should perform simple subtraction", () => {
    expect(evaluate("2 3 -")).toEqual(-1);
  });

  it("should perform simple division", () => {
    expect(evaluate("4 2 /")).toEqual(2);
  });

  it("should perform simple multiplication", () => {
    expect(evaluate("2 3 *")).toEqual(6);
  });

  it("should respect operator precedence", () => {
    expect(evaluate("2 3 + 2 *")).toEqual(10);
  });
});
