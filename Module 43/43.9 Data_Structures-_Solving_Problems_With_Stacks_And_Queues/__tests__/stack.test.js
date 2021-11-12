const Stack = require("../src/lib/stack");

describe("Stack", () => {
  it("should create an empty stack", () => {
    const stack = new Stack();
    expect(stack).toBeDefined();
    expect(stack).toHaveProperty("top");
    expect(stack.top).toBeNull();
  });

  it("should push new value", () => {
    const stack = new Stack();
    stack.push(1);
    expect(stack.top.value).toEqual(1);
  });

  it("should push and keep values", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    expect(stack.top.value).toEqual(2);
    expect(stack.top.next.value).toEqual(1);
  });

  it("should push and keep values", () => {
    const stack = new Stack();
    stack.push(1);
    const returned = stack.pop();
    expect(stack.top).toBeNull();
    expect(returned).toEqual(1);
  });
});
