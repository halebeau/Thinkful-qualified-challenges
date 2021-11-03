const search = require("./indexOf");

const numbers = require("./numbers.json");

function forNumber(target) {
  return (element, index) => {
    console.log("compare", target, "to", element, "at index", index);

    if (element === target) {
      return 0;
    }
    if (element < target) {
      return 1;
    }
    if (element > target) {
      return -1;
    }
  };
}

console.log(search(forNumber(35077), numbers));
