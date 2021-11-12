const LinkedList = require("../../src/linked-list/linkedList");
const removeDuplicates = require("../../src/linked-list/removeDuplicates");

expect.extend({
  toContainValues(received, expected) {
    const actual = [];

    let node = received.head;

    while (node) {
      actual.push(node.value);
      node = node.next;
    }

    return {
      pass: this.equals(actual, expected),
      message: () =>
        `Received ${actual.join("->")}, expected ${expected.join("->")}`,
    };
  },
});

describe("removeDuplicates", () => {
  test.each([
    [[], []],
    [[1], [1]],
    [[1, 1], [1]],
    [
      [1, 1, 2],
      [1, 2],
    ],
    [
      [1, 2, 2],
      [1, 2],
    ],
    [["fred", "fred"], ["fred"]],
  ])("%# removeDuplicates(%s) returns %s", (elements, expected) => {
    const linkedList = new LinkedList();
    elements.forEach((element) => linkedList.insert(element));

    const findSpy = jest.spyOn(linkedList, "find");

    const actual = removeDuplicates(linkedList);

    expect(actual).toContainValues(expected);
    expect(findSpy).not.toHaveBeenCalled();
  });
});
