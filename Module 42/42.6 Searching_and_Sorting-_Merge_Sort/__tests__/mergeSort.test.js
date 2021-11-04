const path = require("path");

const sort = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/mergeSort"
));

describe("Merge sort", () => {
  test("returns null when array is null", () => {
    const compare = jest.fn(() => 0);
    const elements = null;

    const actual = sort(compare, elements);

    expect(actual).toBe(null);
    expect(compare).not.toHaveBeenCalled();
  });
  test("returns empty array when array is empty", () => {
    const compare = jest.fn(() => 0);
    const elements = [];

    const actual = sort(compare, elements);

    expect(actual).toEqual([]);
    expect(compare).not.toHaveBeenCalled();
  });

  test("swaps two numeric elements that are out of order", () => {
    const compare = jest.fn((left, right) => {
      return left - right;
    });

    const elements = [1, 0];

    const actual = sort(compare, elements);

    expect(actual).toEqual([0, 1]);

    expect(compare.mock.calls).toEqual([[1, 0]]);
  });

  test("swaps two string elements that are out of order", () => {
    const compare = jest.fn((left, right) => {
      return left.localeCompare(right);
    });

    const elements = ["z", "a"];

    const actual = sort(compare, elements);

    expect(actual).toEqual(["a", "z"]);

    expect(compare.mock.calls).toEqual([["z", "a"]]);
  });

  test("swaps three numeric elements that are out of order", () => {
    const compare = jest.fn((left, right) => {
      return left - right;
    });

    const elements = [1, 4, 0];

    const actual = sort(compare, elements);

    expect(actual).toEqual([0, 1, 4]);

    expect(compare.mock.calls).toEqual([
      [4, 0],
      [1, 0],
      [1, 4],
    ]);
  });

  test("swaps four numeric elements that are out of order", () => {
    const compare = jest.fn((left, right) => {
      return left - right;
    });

    const elements = [5, 1, 4, 2];

    const actual = sort(compare, elements);

    expect(actual).toEqual([1, 2, 4, 5]);

    expect(compare.mock.calls).toEqual([
      [5, 1],
      [4, 2],
      [1, 2],
      [5, 2],
      [5, 4],
    ]);
  });
});
