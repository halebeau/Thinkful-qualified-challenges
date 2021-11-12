
const RegularStack = require("../../src/stack/stack");
const LinkedListStack = require("../../src/linked-list/stack");

describe.each([
  ["src/stack/stack", RegularStack],
  ["src/linked-list/stack", LinkedListStack],
])("%# Stack(%s)", (path, Stack) => {
  test("starts empty", () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBe(true);
  });

  describe("push", () => {
    test('"apple"', () => {
      const stack = new Stack();

      stack.push("apple");

      expect(stack.peek()).toBe("apple");
      expect(stack.isEmpty()).toBe(false);
    });

    test('"apple" and "orange"', () => {
      const stack = new Stack();

      stack.push("apple");
      stack.push("orange");

      expect(stack.peek()).toBe("orange");
    });
  });

  describe("pop", () => {
    test("only node to make empty stack", () => {
      const stack = new Stack();
      stack.push("first");

      const actual = stack.pop();

      expect(actual).toBe("first");
      expect(stack.isEmpty()).toBe(true);
    });

    test("one node", () => {
      const stack = new Stack();
      stack.push("first");
      stack.push("second");

      const actual = stack.pop();

      expect(actual).toBe("second");
      expect(stack.peek()).toBe("first");
      expect(stack.isEmpty()).toBe(false);
    });

    test("multiple nodes", () => {
      const stack = new Stack();
      stack.push("first");
      stack.push("middle");
      stack.push("last");

      stack.pop();
      const actual = stack.pop();

      expect(actual).toBe("middle");
      expect(stack.peek()).toBe("first");
      expect(stack.isEmpty()).toBe(false);
    });

    test("all nodes", () => {
      const stack = new Stack();
      stack.push("first");
      stack.push("middle");
      stack.push("last");

      stack.pop();
      stack.pop();
      const actual = stack.pop();

      expect(actual).toBe("first");
      expect(stack.isEmpty()).toBe(true);
    });
  });
});

describe("Stack(src/linked-list/stack)", () => {
  test("push delegates to linked list", () => {
    const stack = new LinkedListStack();
    const spy = jest.spyOn(stack.linkedList, "insertAtHead");
    stack.push("new-head");
    expect(spy).toHaveBeenCalledWith("new-head");
  });

  test("pop delegates to linked list", () => {
    const stack = new LinkedListStack();
    const spy = jest.spyOn(stack.linkedList, "remove");
    stack.push("new-value");

    const actual = stack.pop();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(actual).toBe("new-value");
  });
});
