/**
 * Return true if s1 is an anagram of s2
 * @param {string} s1
 * @param {string} s2
 */
function anagram(s1, s2) {
    const s1Sorted = Array.from(s1.split(''))
        .sort()
        .join('');
    const s2Sorted = Array.from(s2.split(''))
        .sort()
        .join('');

    if (s1Sorted.toLowerCase() === s2Sorted.toLowerCase()) {
        return true;
    }else{
        return false;
    }
}

module.exports = anagram;