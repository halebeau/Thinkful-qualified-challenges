const path = require("path");

const search = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/indexOf"
));

fdescribe("Linear Search", () => {
  test("returns -1 when array is null", () => {
    const isMatch = jest.fn(() => true);
    const elements = null;

    const actual = search(isMatch, elements);

    expect(actual).toBe(-1);
    expect(isMatch).not.toHaveBeenCalled();
  });
  test("returns -1 when array is empty", () => {
    const isMatch = jest.fn(() => true);
    const elements = [];

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    const actual = search(isMatch, elements);

    expect(actual).toBe(-1);
    expect(isMatch).not.toHaveBeenCalled();

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns 0 when the first element matches", () => {
    const isMatch = jest.fn((element) => element === 0);
    const elements = [0];

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    const actual = search(isMatch, elements);

    expect(actual).toBe(0);

    expect(isMatch).toHaveBeenCalledTimes(1);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });
  test("returns 1 when second element matches", () => {
    const isMatch = jest.fn((element) => element === "one");
    const elements = ["zero", "one"];

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    const actual = search(isMatch, elements);

    expect(actual).toBe(1);
    expect(isMatch).toHaveBeenCalledTimes(2);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns 3 when the 4th element matches", () => {
    const isMatch = jest.fn(
      (element) => element.bundle === "com.symantec.Flexidy"
    );

    const elements = [
      {
        bundle: "cz.toplist.Zamit",
      },
      {
        bundle: "info.aboutads.Home Ing",
      },
      {
        bundle: "cn.gov.miitbeian.Span",
      },
      {
        bundle: "com.symantec.Flexidy",
      },
      {
        bundle: "com.baidu.Voltsillam",
      },
      {
        bundle: "jp.co.google.Zamit",
      },
      {
        bundle: "com.indiegogo.Solarbreeze",
      },
      {
        bundle: "com.xinhuanet.Rank",
      },
      {
        bundle: "com.samsung.Zamit",
      },
      {
        bundle: "com.foxnews.Tempsoft",
      },
    ];

    const copyOfElements = [...elements];
    const calls = elements
      .filter((element, index) => index <= 3)
      .map((element, index) => [element, index, copyOfElements]);

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    const actual = search(isMatch, elements);

    expect(actual).toBe(3);
    expect(isMatch).toHaveBeenCalledTimes(4);

    // This verifies that each element in the array was passed to the matcher
    // Copies of arrays do not match due to function differences.
    expect(JSON.stringify(isMatch.mock.calls)).toEqual(JSON.stringify(calls));

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("returns -1 when there is no match", () => {
    const isMatch = jest.fn(() => false);

    const elements = [
      {
        id: "2ccdad60-7913-4125-95b0-3d96fd9bc140",
      },
      {
        id: "7283054e-c9ac-4bc3-b6e7-f073f90bb672",
      },
      {
        id: "06344c9e-e4b1-40d7-9a0e-84ec45df679e",
      },
      {
        id: "17ae1ea5-bb36-44c9-9f37-e943c9b8bcbf",
      },
      {
        id: "bea87b9a-722f-48cb-bd9d-8345b2d5e223",
      },
      {
        id: "4679b3a7-ed78-4dfb-8c33-a240efa98101",
      },
      {
        id: "64226c48-ed05-410f-ab43-881755e82ea5",
      },
      {
        id: "7a81d525-196c-448e-92a8-f2a617ba5bc1",
      },
      {
        id: "ee62aa32-f6cf-4b0a-a888-c3cc3cab0321",
      },
      {
        id: "1b192654-558d-42aa-a91d-e251a77656f4",
      },
    ];

    const copyOfElements = [...elements];
    // map each element to a calls array
    const calls = elements.map((element, index, array) => [
      element,
      index,
      array,
    ]);

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    const actual = search(isMatch, elements);

    expect(actual).toBe(-1);
    expect(isMatch).toHaveBeenCalledTimes(10);

    // This verifies that each element in the array was passed to the matcher
    // Comparison of multidimensional arrays do not match due to function differences.
    expect(JSON.stringify(isMatch.mock.calls)).toEqual(JSON.stringify(calls));

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("does not catch error thrown by matcher", () => {
    const expected = new Error("Cannot read property isMatch of undefined.");

    const isMatch = jest.fn(() => {
      throw expected;
    });

    const elements = ["zero", "one"];

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    expect(() => search(isMatch, elements)).toThrowError(expected);

    expect(isMatch).toHaveBeenCalledTimes(1);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });

  test("does not iterate more if the matcher pushes data into the array", () => {
    const isMatch = jest.fn((element, index, array) => {
      // Have to limit it or it will go infinite.
      if (array.length < 20) {
        array.push(index + 7);
      }

      return false;
    });

    const elements = ["zero", "one"];

    const everySpy = jest.spyOn(elements, "every");
    const findIndexSpy = jest.spyOn(elements, "findIndex");
    const indexOfSpy = jest.spyOn(elements, "indexOf");

    const actual = search(isMatch, elements);

    expect(actual).toBe(-1);

    expect(isMatch).toHaveBeenCalledTimes(2);

    expect(everySpy).not.toHaveBeenCalled();
    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(indexOfSpy).not.toHaveBeenCalled();
  });
});
