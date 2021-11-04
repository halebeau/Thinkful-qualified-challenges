/**
 * Returns the string with the characters in reverse order
 * @param {string} text the string to be reversed
 */
function reverse(text) {
  if (text === "") return text;
  text = text.split("");
  const lastLetter = text.pop();
  const newString = reverse(text.join(""));
  return lastLetter + newString;
}

module.exports = reverse;