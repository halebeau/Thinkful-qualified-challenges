/**
 * Return true if some permutation of this word is a palindrome
 * @param {string} word The word to check
 */
function permutationPalindrome(word) {
    let count = {};
    //palindrome can have one nonduplicate character in the center
    let singleChar = [];
    const wordArray = word.toLowerCase().split('');
    let isPalindrome = false;

    wordArray.forEach(letter => {
        if ( count[letter] ){
            count[letter] ++;
        }else{
            count[letter] = 1;
        }
    });
    
    for (let duplicates in count) {
        if (count[duplicates] % 2) singleChar.push(count[duplicates]);
    }

    singleChar.length <= 1 ? isPalindrome = true : isPalindrome;
    return isPalindrome;
}

module.exports = permutationPalindrome;