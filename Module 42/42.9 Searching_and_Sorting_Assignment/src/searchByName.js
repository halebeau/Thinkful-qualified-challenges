/**
 * Use a binary search to find the customer with given name
 * @param {string} firstName
 * @param {string} lastName
 * @param {array} customers
 */

function compare(element, target) {
  if (element === target) return 0;
  if (element < target) return 1;
  if (element > target) return -1;
}

function searchByName(firstName, lastName, customers) {
  if (Array.isArray(customers)) {
    //always starts at zero
    let lowerIndex = 0;
    //starts at the largest index for the array
    let upperIndex = customers.length - 1;

    while (lowerIndex <= upperIndex) {
      const index = Math.floor((upperIndex + lowerIndex) / 2);

      const firstNameComparison = compare(
        customers[index].firstName,
        firstName
      );
      const lastNameComparison = compare(customers[index].lastName, lastName);

      if (lastNameComparison > 0) {
        lowerIndex = index + 1;
      }
      if (lastNameComparison === 0) {
        if (firstNameComparison > 0) lowerIndex = index + 1;
        if (firstNameComparison < 0) upperIndex = index - 1;
        if (firstNameComparison === 0) return index;
      }
      if (lastNameComparison < 0) {
        upperIndex = index - 1;
      }
    }
  }
  return -1;
}

module.exports = searchByName;