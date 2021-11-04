const reverse = require("../src/reverse");

describe("Reverse", () => {
  it("should reverse the empty string", () => {
    expect(reverse("")).toEqual("");
  });

  it("should reverse a single character", () => {
    expect(reverse("a")).toEqual("a");
  });

  it("should reverse distinct characters", () => {
    expect(reverse("abcdef")).toEqual("fedcba");
  });
});
