/**
 * Write a function named splitSum1 that implements algorithm 1 here
 */

// accepts tours - an array of group sizes
function splitSum1(tours) {
  // calculate the sum of all numbers in the tours array
  // and assign it to a variable named total
  const total = tours.reduce((reducer, tour) => reducer + tour);
  // initialize a variable named preSum to the value 0
  let preSum = 0;
  // initialize a variable named postSum to the value of total
  let postSum = total;
  // initialize a variable named smallest to the largest posible number
  let smallest = Number.MAX_VALUE;

  // for i = 0 to the length of tours - 1 do:
  for (let i = 0; i < tours.length - 1; i++) {
    // set preSum to the sum of preSum and tours[i]
    preSum += tours[i];
    // set postSum to postSum - tours[i]
    postSum -= tours[i];
    // find the absolute difference between preSum and postSum
    let difference = Math.abs(preSum - postSum);
    // if the difference is less than smallest then set smallest to the difference
    if (difference < smallest) smallest = difference;
  }
  // return smallest
  return smallest;
}

/**
 * Write a function named splitSum2 that implements algorithm 2 here
 */
// accepts tours - an array of group sizes
function splitSum2(tours) {
  // initialize a variable named smallest to the largest posible number
  let smallest = Number.MAX_VALUE;
  // for k = 0 to the length of the tours array - 1 do:
  for (let k = 0; k < tours.length - 1; k++) {
    // calculate the sum of numbers from index 0 to index
    // i of tours and assign to a variable named preSum
    let preSum = tours.slice(0, k + 1).reduce((reducer, tour) => {
      return tour + reducer;
    }, 0);
    // calculate the sum of the numbers from index i + 1 to
    // the end of tours and assign to a variable named postSum
    let postSum = tours.slice(k + 1, tours.length).reduce((reducer, tour) => {
      return tour + reducer;
    }, 0);
    const difference = Math.abs(preSum - postSum);
    if (difference < smallest) smallest = difference;
  }
  return smallest;
}

module.exports = { splitSum1, splitSum2 };
