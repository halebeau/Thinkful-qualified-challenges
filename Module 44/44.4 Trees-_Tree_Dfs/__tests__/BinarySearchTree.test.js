const path = require("path");

const BinarySearchTree = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/BinarySearchTree"
));

describe("Binary search tree", () => {
  let binarySearchTree;
  beforeEach(() => {
    binarySearchTree = new BinarySearchTree(5, 5);
    binarySearchTree.insert(2, 2);
    binarySearchTree.insert(19, 19);
    binarySearchTree.insert(15, 15);
    binarySearchTree.insert(28, 28);
    binarySearchTree.insert(30, 30);
    binarySearchTree.insert(10, 10);
    binarySearchTree.insert(18, 18);

    // Resulting tree:
    //     5
    //   /   \
    // 2      19
    //       /  \
    //      15  28
    //     /  \   \
    //    10  18  30
  });

  test("should have methods named 'insert()', 'find()', 'remove()', 'dfsInOrder()', 'dfsPreOrder', and 'dfsPostOrder' ", () => {
    expect(typeof binarySearchTree.insert).toEqual("function");
    expect(typeof binarySearchTree.find).toEqual("function");
    expect(typeof binarySearchTree.remove).toEqual("function");
    expect(typeof binarySearchTree.dfsInOrder).toEqual("function");
    expect(typeof binarySearchTree.dfsPreOrder).toEqual("function");
    expect(typeof binarySearchTree.dfsPostOrder).toEqual("function");
  });

  test("should visit the BST using in-order traversal", () => {
    const expected = [2, 5, 10, 15, 18, 19, 28, 30];
    expect(binarySearchTree.dfsInOrder()).toEqual(expected);
  });

  test("should visit the BST using pre-order traversal", () => {
    const expected = [5, 2, 19, 15, 10, 18, 28, 30];
    expect(binarySearchTree.dfsPreOrder()).toEqual(expected);
  });

  test("should visit the BST using post-order traversal", () => {
    const expected = [2, 10, 18, 15, 30, 28, 19, 5];
    expect(binarySearchTree.dfsPostOrder()).toEqual(expected);
  });
});
