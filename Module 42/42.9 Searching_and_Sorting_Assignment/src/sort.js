/**
 * A sort algorithm that implements a stable sort
 * @param {function} compare The comparator function used in sorting
 * @param {array} elements The array to be sorted
 */

// bubble sort
function sort(compare, elements) {
  if (Array.isArray(elements)) {
    let sorted;
    // start do while loop that iterates until the sorted var is true
    do {
      sorted = true;
      for (let i = 0; i < elements.length - 1; i++) {
        // create vars for the compare() params
        const left = elements[i];
        const right = elements[i + 1];
        // check to see if the smaller of the two comes first
        // right element is greater than the left element
        if (compare(left, right) > 0) {
          // switch the left and rights' positions
          elements[i] = right;
          elements[i + 1] = left;
          // set sorted to false to continue iterating through the elements to compare
          sorted = false;
        }
      }
    } while (sorted === false);
  }
  return elements;
}

function compare(left, right) {
  console.log("compare", left, "to", right);
  return left - right;
}


module.exports = sort;