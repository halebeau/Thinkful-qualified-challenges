const sort = require("./mergeSort");

const numbers = require("./numbers.json");

function compare(left, right) {
  return left - right;
}

console.log(sort(compare, numbers));
