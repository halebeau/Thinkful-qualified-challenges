const Node = require("../src/lib/node");

describe("Node", () => {
  it("should create a node with value and next properties", () => {
    const node = new Node();
    expect(node).toHaveProperty("value");
    expect(node).toHaveProperty("next");
    expect(node.value).toBeUndefined();
    expect(node.next).toBeNull();
  });

  it("should create a node with given value", () => {
    const node = new Node(1);
    expect(node).toHaveProperty("value");
    expect(node).toHaveProperty("next");
    expect(node.value).toEqual(1);
    expect(node.next).toBeNull();
  });

  it("should create a node with given value and next", () => {
    const next = new Node();
    const node = new Node(1, next);
    expect(node).toHaveProperty("value");
    expect(node).toHaveProperty("next");
    expect(node.value).toEqual(1);
    expect(node.next).toEqual(next);
  });
});
