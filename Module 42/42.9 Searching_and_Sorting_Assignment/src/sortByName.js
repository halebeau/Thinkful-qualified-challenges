const sort = require("./sort");

function compare(nameOne, nameTwo) {
  if (nameOne === nameTwo) return 0;
  if (nameOne > nameTwo) return 1;
  if (nameOne < nameTwo) return -1;
}

/**
 * Sort the array of customers by first and last name
 * @param {array} customers
 */
function sortByName(customers) {
  let sortedNames = [];
  let fullName = customers.map((customer) => {
    return customer.lastName + customer.firstName;
  });

  // this will sort the last names alphabetically
  //> ["appleseedjohn", "petrosmaggie", "thompsonreilly", ...]
  const sortByLastName = sort(compare, fullName);
  console.log("sorted last names", sortByLastName);

  // this takes the array of customers sorted by last name,
  sortByLastName.forEach((name) => {
    let lastName = name.slice(0, 1);
    console.log("last name:", lastName);

    let firstName = name.slice(1);
    console.log("first name", firstName);

    let finalName = { firstName, lastName };
    console.log("first and last name", finalName);

    sortedNames.push(finalName);
  });
  return sortedNames;
  console.log("sorted names", sortedNames);
}

module.exports = sortByName;