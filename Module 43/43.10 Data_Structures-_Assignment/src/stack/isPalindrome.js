/**
 * A palindrome is a word, phrase, or number that is spelled the same forward and backward.
 * For example, “dad” is a palindrome; “A man, a plan, a canal: Panama” is a palindrome if you take out the spaces and ignore the punctuation;
 * and 1,001 is a numeric palindrome.
 *
 * Use a stack to determine whether or not a given string is a palindrome.
 *
 * The implementation should have O(n) performance.
 *
 * @param text
 *  a possibly empty string that may be a palindrome.
 */

const Stack = require("../linked-list/stack");

function isPalindrome(text) {
  let cleanText = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  // TODO: Write an O(n) algorithm that uses a stack to determine whether 
  //the given input text is palindrome or not.
  if (cleanText.length === 0) return false;
  const newStack = new Stack();
  let middle = Math.floor(cleanText.length / 2);
  console.log(middle);
  //check for odd number of characters and remove center char if exists
  if (cleanText.length % 2) {
    cleanText = cleanText.slice(0, middle) + cleanText.slice(middle + 1);
    //middle += 1;
  }

  for (let i = 0; i < cleanText.length; i++) {
    if (i < middle) {
      newStack.push(cleanText[i]);
    }
    //while
    if (i >= middle) {
      if (newStack.pop() !== cleanText[i]){
        return false;//true
      }
    }
  }

  return true;//false
}

module.exports = isPalindrome;