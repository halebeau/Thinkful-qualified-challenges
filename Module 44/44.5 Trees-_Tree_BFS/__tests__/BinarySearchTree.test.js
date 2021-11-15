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

  test("should have methods named 'insert()', 'find()', 'remove()' and 'bfs()' ", () => {
    expect(typeof binarySearchTree.insert).toEqual("function");
    expect(typeof binarySearchTree.find).toEqual("function");
    expect(typeof binarySearchTree.remove).toEqual("function");
    expect(typeof binarySearchTree.bfs).toEqual("function");
  });

  test("should visit the BST using breadth-first search traversal", () => {
    const expected = [5, 2, 19, 15, 28, 10, 18, 30];
    expect(binarySearchTree.bfs(binarySearchTree)).toEqual(expected);
  });
});
