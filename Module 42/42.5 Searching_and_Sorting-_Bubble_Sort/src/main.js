const sort = require("./bubbleSort");

const numbers = require("./numbers.json");

// This compare function sorts the numbers in descending order.
function compare(left, right) {
  return right - left;
}

console.log(sort(compare, numbers));
