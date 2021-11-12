/**
 * Return a grouping of words by whether they are anagrams of each other or not
 * @param {array} words to be grouped
 */
function anagramGroups(words) {
    let results = new Map();
  
  words.forEach(word => {
    word.toLowerCase();
    const anagram = Array.from(word.split(''))
      .sort()
      .join('');
    
    if (results.has(anagram)) {
      results.get(anagram).push(word)
    }else {
      results.set(anagram, [word])
    }
  });
  let resultArray = Array.from(results.values());
  return resultArray;
}

module.exports = anagramGroups;