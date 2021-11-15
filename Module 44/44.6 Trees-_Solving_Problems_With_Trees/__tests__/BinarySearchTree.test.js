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

  test("should have methods named 'insert()', 'find()', 'remove()', 'dfsInOrder()', 'dfsPreOrder()', 'dfsPostOrder()', 'bfs()', 'countLeaves()', and 'isBalancedBST()' ", () => {
    expect(typeof binarySearchTree.insert).toEqual("function");
    expect(typeof binarySearchTree.find).toEqual("function");
    expect(typeof binarySearchTree.remove).toEqual("function");
    expect(typeof binarySearchTree.dfsInOrder).toEqual("function");
    expect(typeof binarySearchTree.dfsPreOrder).toEqual("function");
    expect(typeof binarySearchTree.dfsPostOrder).toEqual("function");
    expect(typeof binarySearchTree.bfs).toEqual("function");
    expect(typeof binarySearchTree.countLeaves).toEqual("function");
    expect(typeof binarySearchTree.isBalancedBST).toEqual("function");
  });

  describe("countLeaves", () => {
    test("should count the number of leaves in the tree", () => {
      expect(binarySearchTree.countLeaves()).toEqual(4);
    });
    test("should return 1 for a BST with only a root node", () => {
      let binarySearchTree = new BinarySearchTree(1);
      expect(binarySearchTree.countLeaves()).toEqual(1);
    });
  });

  describe("isBalancedBST", () => {
    test("should return -1 for a BST that is not balanced", () => {
      expect(binarySearchTree.isBalancedBST()).toEqual(-1);
    });
    test("should return the height for a balanced BST", () => {
      let binarySearchTree = new BinarySearchTree(5, 5);
      expect(binarySearchTree.isBalancedBST()).toEqual(0);

      binarySearchTree.insert(2, 2);
      binarySearchTree.insert(19, 19);
      expect(binarySearchTree.isBalancedBST()).toEqual(1);

      binarySearchTree.insert(15, 15);
      binarySearchTree.insert(28, 28);
      expect(binarySearchTree.isBalancedBST()).toEqual(2);
    });
  });
});
