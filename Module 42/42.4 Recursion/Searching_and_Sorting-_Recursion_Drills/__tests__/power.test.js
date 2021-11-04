const power = require("../src/power");

describe("Power", () => {
  it("anything raised to power 0 is 1", () => {
    expect(power(10, 0)).toEqual(1);
  });

  it("anything raised to power 1 is itself", () => {
    expect(power(10, 1)).toEqual(10);
  });

  it("should throw error for negative exponent", () => {
    expect(() => power(10, -2)).toThrow(/exponent should be >= 0/);
  });

  it("should raise to the given power", () => {
    expect(power(10, 4)).toEqual(10000);
  });

  it("should work with negative base", () => {
    expect(power(-10, 2)).toEqual(100);
  });
});
