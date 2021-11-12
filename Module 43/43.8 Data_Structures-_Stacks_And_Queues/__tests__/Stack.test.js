const Stack = require("../src/Stack");

describe("Stack", () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
    stack.push("apple");
    stack.push("orange");
    stack.push("banana");
    stack.push("pineapple");
    stack.push("kiwi");
    stack.push("watermelon");
  });

  test("should have methods named 'push()', and 'pop()'' ", () => {
    expect(typeof stack.push).toEqual("function");
    expect(typeof stack.pop).toEqual("function");
  });

  test("should correctly insert a fruit into the stack", () => {
    expect(stack.top.value).toEqual("watermelon");
    stack.push("grapes");
    expect(stack.top.value).toEqual("grapes");
    stack.push("starfruit");
    expect(stack.top.value).toEqual("starfruit");
  });

  test("should correctly insert a fruit into an empty stack", () => {
    let stack = new Stack();
    expect(stack.top).toBeNull();
    stack.push("grapes");
    expect(stack.top.value).toEqual("grapes");
    stack.push("starfruit");
    expect(stack.top.value).toEqual("starfruit");
  });

  test("should correctly remove a fruit from the stack", () => {
    expect(stack.pop()).toEqual("watermelon");
    expect(stack.top.value).toEqual("kiwi");
    expect(stack.pop()).toEqual("kiwi");
    expect(stack.top.value).toEqual("pineapple");
    expect(stack.pop()).toEqual("pineapple");
    expect(stack.top.value).toEqual("banana");
    expect(stack.pop()).toEqual("banana");
    expect(stack.top.value).toEqual("orange");
    expect(stack.pop()).toEqual("orange");
    expect(stack.top.value).toEqual("apple");
    expect(stack.pop()).toEqual("apple");
    expect(stack.top).toBeNull();
  });
});
