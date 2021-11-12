const Node = require("./node");

/**
 * LinkedList class holds a reference to the `head` node and has functions that update the list.
 */

class LinkedList {
  constructor(values) {
    this.head = null;

    if (values && Array.isArray(values)) {
      values.reverse().forEach((value) => this.insertAtHead(value));
    }
  }

  /**
   * The number of nodes in the linked list.
   * The value is an unsigned, 32-bit integer that is always 1 greater than the highest index in the list.
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
   *  if list is not empty and no matching node is found.
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
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   */

  remove(isMatch) {
    const [matchedNode, previousNode] = this.findWithPrevious(isMatch);

    if (this.head === matchedNode) {
      this.head = this.head.next;
    } else {
      previousNode.next = matchedNode.next;
    }
    return this;
  }

  /**
   * Return the values of the linked list as an array
   *
   * @returns {Array}
   * the values in this linked list in an array
   */
  asArray() {
    const values = [];
    let node = this.head;
    while (node) {
      values.push(node.value);
      node = node.next;
    }
    return values;
  }

  /**
   * Create a string representation of this linked list
   *
   * @returns {String}
   * A String representation of this linked list
   */
  toString() {
    return `|${this.asArray().join("->")}|`;
  }
}

module.exports = LinkedList;
