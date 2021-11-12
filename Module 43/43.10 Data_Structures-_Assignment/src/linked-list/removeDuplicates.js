/**
 * Remove duplicate values, if any, from a sorted linked list.
 *
 * The algorithm should be O(n) time complexity, 
 * therefore it cannot use `find()`.
 *
 * @param sortedLinkedList
 *  a possibly empty link list with all values in lexical order.
 *
 * @returns {LinkedList}
 *  the original linked list with any duplicate values removed.
 */

function removeDuplicates(sortedLinkedList) {
  // TODO: implement an algorithm to remove duplicate values from a 
  //sorted linked list.
  let pointer = sortedLinkedList.head;

  while (pointer !== null && pointer.next !== null) {
    if (pointer.value === pointer.next.value) {
      pointer.next = pointer.next.next;
    } else {
      pointer = pointer.next
    }
  }

  return sortedLinkedList;
}

module.exports = removeDuplicates;
