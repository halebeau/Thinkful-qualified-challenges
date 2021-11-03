function indexOf(compare, sortedElements) {
  if (Array.isArray(sortedElements)) {
    let lowerIndex = 0;
    let upperIndex = sortedElements.length - 1;

    while (lowerIndex <= upperIndex) {
      const index = Math.floor((upperIndex + lowerIndex) / 2);

      const comparison = compare(sortedElements[index], index, sortedElements);

      if (comparison > 0) {
        lowerIndex = index + 1;
      }

      if (comparison === 0) {
        return index;
      }

      if (comparison < 0) {
        upperIndex = index - 1;
      }
    }
  }
  return -1;
}

module.exports = indexOf;
