/**
 * Implement an algorithm that sorts the array then returns the minimum and maximum
 */
function minimumAndMaximumSort(numbers) {
  if (numbers.length === 0) return [];
  const minMax = [];
  const sorted = numbers.sort((a, b) => a - b);
  minMax.push(sorted[0]);
  minMax.push(sorted[sorted.length - 1]);
  return minMax;
}

/**
 * Implement an algorithm that uses iteration to find the minimum and maximum
 */
function minimumAndMaximumIterate(numbers) {
  if (numbers.length === 0) return [];
  const minMax = [Infinity, -Infinity];
  numbers.forEach((number) => {
    if (number > minMax[1]) minMax[1] = number;
    if (number < minMax[0]) minMax[0] = number;
  });
  return minMax;
}

module.exports = { minimumAndMaximumIterate, minimumAndMaximumSort };