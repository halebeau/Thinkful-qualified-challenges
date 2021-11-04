const sort = require("./quickSort");

const numbers = require("./numbers.json");

function compare(left, right) {
  console.log("compare", left, right);
  return left - right;
}

console.log(sort(compare, numbers));
