const path = require("path");

const search = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/indexOf"
));

describe("Binary Search", () => {
  test("returns -1 when array is null", () => {
    const compare = jest.fn(() => 0);
    const sortedElements = null;

    const actual = search(compare, sortedElements);

    expect(actual).toBe(-1);
    expect(compare).not.toHaveBeenCalled();
  });
  test("returns -1 when array is empty", () => {
    const compare = jest.fn(() => 0);
    const sortedElements = [];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(-1);
    expect(compare).not.toHaveBeenCalled();

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns 0 when the first element matches", () => {
    const compare = jest.fn((element) => {
      const target = 0;
      if (element < target) {
        return 1;
      }
      if (element > target) {
        return -1;
      }
      return 0;
    });

    const sortedElements = [0];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(0);

    expect(compare).toHaveBeenCalledTimes(1);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns 1 when the second element matches", () => {
    const compare = jest.fn((element) => {
      const target = 3;
      if (element < target) {
        return 1;
      }
      if (element > target) {
        return -1;
      }
      return 0;
    });

    const sortedElements = [0, 3];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(1);

    //expect(compare).toHaveBeenCalledTimes(2);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns 3 when the third element matches, moving right from mid point", () => {
    const compare = jest.fn((element) => {
      const target = 3;
      if (element === target) {
        return 0;
      }
      if (element < target) {
        return 1;
      }
      if (element > target) {
        return -1;
      }
    });

    const sortedElements = [0, 1, 2, 3, 4];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(3);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns 1 when the second element matches, moving left from mid point", () => {
    const compare = jest.fn((element) => {
      const target = 1;
      if (element === target) {
        return 0;
      }
      if (element < target) {
        return 1;
      }
      if (element > target) {
        return -1;
      }
    });

    const sortedElements = [0, 1, 2, 3, 4];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(1);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns -1 when searching for 1932", () => {
    const compare = jest.fn((element) => {
      const target = 1932;
      if (element === target) {
        return 0;
      }
      if (element < target) {
        return 1;
      }
      if (element > target) {
        return -1;
      }
    });

    const sortedElements = [922, 946, 1932, 1003, 1029, 1208, 1287, 2977];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(-1);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns -1 when searching for 2261, and the array is not ordered", () => {
    const compare = jest.fn((element) => {
      const target = 2261;
      if (element === target) {
        return 0;
      }
      if (element < target) {
        return 1;
      }
      if (element > target) {
        return -1;
      }
    });

    const sortedElements = [
      105,
      310,
      337,
      675,
      734,
      922,
      946,
      1003,
      1029,
      1208,
      1287,
      1400,
      1442,
      1731,
      1779,
      1932,
      2043,
      2195,
      2218,
      2261,
      2281,
      2396,
      2406,
      2432,
      2546,
      2561,
      2693,
      2770,
      2936,
      2977,
    ];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(19);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns 4 when searching for 2561 with array sorted in reverse order", () => {
    const compare = jest.fn((element) => {
      const target = 2561;
      if (element === target) {
        return 0;
      }
      if (element > target) {
        return 1;
      }
      if (element < target) {
        return -1;
      }
    });

    const sortedElements = [
      2881,
      2814,
      2737,
      2701,
      2561,
      2532,
      2453,
      2038,
      1382,
      1300,
      1170,
      1162,
      1096,
      1020,
      982,
      921,
      887,
      851,
      577,
      422,
      401,
      377,
      363,
      344,
      180,
      70,
      33,
    ];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    const actual = search(compare, sortedElements);

    expect(actual).toBe(4);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("does not catch error thrown by compare function", () => {
    const expected = new Error("Cannot read property compare of undefined.");

    const compare = jest.fn(() => {
      throw expected;
    });

    const sortedElements = ["zero", "one", "two", "five"];

    const everySpy = jest.spyOn(sortedElements, "every");
    const findIndexSpy = jest.spyOn(sortedElements, "findIndex");
    const indexOfSpy = jest.spyOn(sortedElements, "indexOf");

    expect(() => search(compare, sortedElements)).toThrowError(expected);

    //expect(compare.mock.calls).toEqual([["one", 1, sortedElements]]);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("does not iterate more if the compare function pushes data into the array", () => {
    const compare = jest.fn((element, index, array) => {
      // Have to limit it or it will go infinite.
      if (array.length < 20) {
        array.push(index + 20);
      }
      return 1;
    });

    const elements = [1, 3, 5, 7, 9];

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    const actual = search(compare, elements);

    expect(actual).toBe(-1);

    // expect(compare).toHaveBeenCalledTimes(3);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });
});
