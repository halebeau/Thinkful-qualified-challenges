/**
 * Implement a brute force algorithm for finding the missing number in an array
 */

function missingNumberBruteForce(numbers) {
  let current = 1;
  let missing = 0;
  while (missing === 0) {
    if (numbers.includes(current)) {
      current++;
    } else {
      missing = current;
    }
  }
  return missing;
}

/**
 * Use an iterative  strategy for finding the missing number in an array
 */

function missingNumberSum(numbers) {
  const n = numbers.length + 1;
  let numSum = 0;
  numbers.forEach((number) => (numSum += number));
  return (n * (n + 1)) / 2 - numSum;
}

module.exports = { missingNumberBruteForce, missingNumberSum };