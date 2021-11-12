const { union, intersect, difference } = require("../src/setOperations");

describe("Union", () => {
  it("should return empty set for empty sets", () => {
    expect(union(new Set(), new Set())).toEqual(new Set());
  });

  it("should return s1 if s2 is empty", () => {
    expect(union(new Set([1, 2, 3, 4, 5]), new Set())).toEqual(
      new Set([1, 2, 3, 4, 5])
    );
  });

  it("should union two distinct sets", () => {
    expect(union(new Set([1, 2, 3, 4]), new Set([5, 6, 7, 8]))).toEqual(
      new Set([1, 2, 3, 4, 5, 6, 7, 8])
    );
  });

  it("should union intersecting sets", () => {
    expect(union(new Set([1, 2, 3, 4, 5]), new Set([3, 4, 5, 6, 7]))).toEqual(
      new Set([1, 2, 3, 4, 5, 6, 7])
    );
  });
});

describe("Intersect", () => {
  it("should return empty set for empty sets", () => {
    expect(intersect(new Set(), new Set())).toEqual(new Set());
  });
  it("should return empty set if s2 is empty", () => {
    expect(intersect(new Set([1, 2, 3, 4, 5]), new Set())).toEqual(new Set([]));
  });

  it("should return empty set two distinct sets", () => {
    expect(intersect(new Set([1, 2, 3, 4]), new Set([5, 6, 7, 8]))).toEqual(
      new Set()
    );
  });

  it("should intersect intersecting sets", () => {
    expect(
      intersect(new Set([1, 2, 3, 4, 5]), new Set([3, 4, 5, 6, 7]))
    ).toEqual(new Set([3, 4, 5]));
  });
});

describe("Difference", () => {
  it("should return empty set for empty sets", () => {
    expect(difference(new Set(), new Set())).toEqual(new Set());
  });

  it("should return s1 if s2 is empty", () => {
    expect(difference(new Set([1, 2, 3, 4, 5]), new Set())).toEqual(
      new Set([1, 2, 3, 4, 5])
    );
  });

  it("should return s1 for two distinct sets", () => {
    expect(difference(new Set([1, 2, 3, 4]), new Set([5, 6, 7, 8]))).toEqual(
      new Set([1, 2, 3, 4])
    );
  });

  it("should return difference for intersecting sets", () => {
    expect(
      difference(new Set([1, 2, 3, 4, 5]), new Set([3, 4, 5, 6, 7]))
    ).toEqual(new Set([1, 2]));
  });

  it("should return difference for intersecting sets in reverse order - difference is not cummutative ", () => {
    expect(
      difference(new Set([3, 4, 5, 6, 7]), new Set([1, 2, 3, 4, 5]))
    ).toEqual(new Set([6, 7]));
  });
});
