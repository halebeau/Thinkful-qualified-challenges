const path = require("path");

const BinarySearchTree = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/BinarySearchTree"
));

describe("Binary search tree", () => {
  let binarySearchTree;
  beforeEach(() => {
    binarySearchTree = new BinarySearchTree(5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(19);
    binarySearchTree.insert(15);
    binarySearchTree.insert(28);
    binarySearchTree.insert(30);
    binarySearchTree.insert(10);
    binarySearchTree.insert(18);

    // Resulting tree:
    //     5
    //   /   \
    // 2      19
    //       /  \
    //      15  28
    //     /  \   \
    //    10  18  30
  });

  test("should have methods named 'insert()', 'find()', and 'remove()' ", () => {
    expect(typeof binarySearchTree.insert).toEqual("function");
    expect(typeof binarySearchTree.find).toEqual("function");
    expect(typeof binarySearchTree.remove).toEqual("function");
  });

  test("should correctly insert a node into the BST", () => {
    expect(binarySearchTree.left.key).toEqual(2);
    expect(binarySearchTree.right.right.key).toEqual(28);
    expect(binarySearchTree.right.right.right.key).toEqual(30);
    expect(binarySearchTree.right.left.key).toEqual(15);
    expect(binarySearchTree.right.left.right.key).toEqual(18);
    expect(binarySearchTree.right.left.left.key).toEqual(10);
  });

  test("should find and return a node in the BST", () => {
    expect(binarySearchTree.find(2)).toBeDefined();
    expect(binarySearchTree.find(28)).toBeDefined();
    expect(binarySearchTree.find(18)).toBeDefined();
    expect(() => binarySearchTree.find(3)).toThrow();
  });

  test("should correctly remove a node that has no children ", () => {
    const nodeToRemove = 18;
    expect(binarySearchTree.find(nodeToRemove)).toBeDefined();
    binarySearchTree.remove(nodeToRemove);
    expect(() => binarySearchTree.find(nodeToRemove)).toThrow();
  });

  test("should correctly remove a node that has 1 child", () => {
    const nodeToRemove = 28;
    expect(binarySearchTree.find(nodeToRemove)).toBeDefined();
    binarySearchTree.remove(nodeToRemove);
    expect(() => binarySearchTree.find(nodeToRemove)).toThrow();
    expect(binarySearchTree.right.right.key).toEqual(30);
  });

  test("should correctly remove a node that has 2 children", () => {
    const nodeToRemove = 19;
    expect(binarySearchTree.find(nodeToRemove)).toBeDefined();
    binarySearchTree.remove(nodeToRemove);
    expect(() => binarySearchTree.find(nodeToRemove)).toThrow();
    expect(binarySearchTree.right.key).toEqual(28);
    expect(binarySearchTree.right.right.key).toEqual(30);
  });
});
