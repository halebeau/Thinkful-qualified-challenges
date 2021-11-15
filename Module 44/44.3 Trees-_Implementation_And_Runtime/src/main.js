const BinarySearchTree = require("src/BinarySearchTree");

binarySearchTree = new BinarySearchTree(5);

// insert
binarySearchTree.insert(2);
binarySearchTree.insert(19);
binarySearchTree.insert(15);
binarySearchTree.insert(28);
binarySearchTree.insert(30);
binarySearchTree.insert(10);
binarySearchTree.insert(18);

console.log(binarySearchTree.left.key);
console.log(binarySearchTree.right.key);

// find
binarySearchTree.find(2)

// remove
binarySearchTree.remove(19);