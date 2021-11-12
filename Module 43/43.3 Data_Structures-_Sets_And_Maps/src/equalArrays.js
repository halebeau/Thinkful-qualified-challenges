/**
 * return true if two arrays are equal, false otherwise
 */

//I don't think this is how you're supposed to do it
function isEqual(a1, a2) {
  a1.sort();
  a2.sort();
  for (let i = 0; i < a1.length; i++) if (a1[i] != a2[i]) return false;
  return true;
}

module.exports = isEqual;