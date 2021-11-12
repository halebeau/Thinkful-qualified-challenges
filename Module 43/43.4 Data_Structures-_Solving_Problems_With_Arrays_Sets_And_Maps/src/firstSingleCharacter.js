/**
 * Return the first character in the string that occurs only once.
 * @param {string} word the string to be analysed
 */
function firstSingleCharacter(word) {
    let count = {};
    const wordArray = word.toLowerCase().split('');
    let firstLetter = null;

    wordArray.forEach(letter => {
        if ( count[letter] ){
            count[letter] ++;
        }else{
            count[letter] = 1;
        }
    });

    for (let singleChar in count) {
        if (count[singleChar] === 1) {
            firstLetter = singleChar;
            break;
        }
    }
    return firstLetter;
}
firstSingleCharacter('abcba');

module.exports = firstSingleCharacter;