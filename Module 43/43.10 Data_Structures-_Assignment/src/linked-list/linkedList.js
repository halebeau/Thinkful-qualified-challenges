/**
 * Node is used to store values in a LinkedList
 */
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * LinkedList class holds a reference to the `head` node and has functions that update the list.
 */

class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * The number of nodes in the linked list.
   *
   * @returns {number}
   *   the number of nodes in the linked list.
   */

  get length() {
    let result = 0;
    let node = this.head;

    while (node) {
      result++;
      node = node.next;
    }
    return result;
  }

  /**
   * Find a node in the linked list.
   *
   * @param isMatch
   *  function that returns true if the current node matches the search criteria.
   *
   * @returns {*|null}
   *  the first node where `isMatch(node, index) === true` or null if no match is found.
   */
  find(isMatch) {
    return this.findWithPrevious(isMatch)[0];
  }

  /**
   * Insert the value after a matched node in the list.
   * By default, the value is inserted at the end of the list.
   *
   * @param value
   *  the value to add.
   *
   * @param isMatch
   *  Optional function that returns true if the current node matches the search criteria.
   *
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   *
   * @throws 'No match found.'
   *  if list is not empty and no matching element is found.
   */
  insert(value, isMatch = (node, index) => index === this.length - 1) {
    if (this.head) {
      const previousNode = this.find(isMatch);

      if (!previousNode) {
        throw new Error("No match found.");
      }

      previousNode.next = new Node(value, previousNode.next);
    } else {
      this.insertAtHead(value);
    }
    return this;
  }

  /**
   * Insert a new value at the head of the list.
   * @param value
   *  the new value to insert
   *
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   */
  insertAtHead(value) {
    this.head = new Node(value, this.head);
    return this;
  }

  /**
   * Find a node, and it's previous node, in the linked list.
   * @param isMatch
   *  function that returns true if the current node matches the search criteria.
   *
   * @returns {[Node|null, Node|null]}
   *  the first element is the node where `isMatch(node, index) === true` or null if no match is found.
   *  the second element is the previous Node, or null if no match is found.
   *  This second element is also null if this.head is the matched node.
   */
  findWithPrevious(isMatch) {
    let index = 0;
    let previous = null;
    let node = this.head;
    while (node) {
      if (isMatch(node, index, this)) {
        return [node, previous];
      }
      index++;
      previous = node;
      node = node.next;
    }
    return [null, null];
  }

  /**
   * Remove the first node where `isMatch(node, index, this) === true`.
   *
   * @param isMatch
   *  function that returns true if the current node matches the node to be removed.
   *
   * @returns {*}
   *  the value of the removed node, where `isMatch(node, index) === true` or null if no match is found.
   */

  remove(isMatch) {
    const [matchedNode, previousNode] = this.findWithPrevious(isMatch);

    if (!matchedNode) {
      return null;
    }

    if (this.head === matchedNode) {
      this.head = this.head.next;
    } else {
      previousNode.next = matchedNode.next;
    }
    return matchedNode.value;
  }
}

module.exports = LinkedList;
