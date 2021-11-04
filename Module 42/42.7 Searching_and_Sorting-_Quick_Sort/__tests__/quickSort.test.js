const path = require("path");

const sort = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/quickSort"
));

describe("Quick sort", () => {
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

    expect(compare.mock.calls).toEqual([[0, 1]]);
  });

  test("swaps two string elements that are out of order", () => {
    const compare = jest.fn((left, right) => {
      return left.localeCompare(right);
    });

    const elements = ["z", "a"];

    const actual = sort(compare, elements);

    expect(actual).toEqual(["a", "z"]);

    expect(compare.mock.calls).toEqual([["a", "z"]]);
  });

  test("swaps three numeric elements that are out of order", () => {
    const compare = jest.fn((left, right) => {
      return left - right;
    });

    const elements = [1, 4, 0];

    const actual = sort(compare, elements);

    expect(actual).toEqual([0, 1, 4]);

    expect(compare.mock.calls).toEqual([
      [0, 1],
      [0, 4],
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
      [2, 5],
      [2, 1],
      [2, 4],
      [5, 4],
    ]);
  });

  test("swaps four numeric elements that are out of order", () => {
    const compare = jest.fn((left, right) => {
      return left - right;
    });

    const elements = [9, 14, 75, 77, 0];

    const actual = sort(compare, elements);

    expect(actual).toEqual([0, 9, 14, 75, 77]);

    expect(compare.mock.calls).toEqual([
      [0, 9],
      [0, 14],
      [0, 75],
      [0, 77],
      [9, 14],
      [9, 75],
      [9, 77],
      [14, 75],
      [14, 77],
      [75, 77],
    ]);
  });
});
