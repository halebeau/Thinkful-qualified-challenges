const LinkedList = require("./linkedList");

/**
 * Implement a Queue using nothing more than a LinkedList.
 */

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  enqueue(value) {
    return this.linkedList.insert(value);
  }

  dequeue() {
    return this.linkedList.remove((node, index) => index === 0);
  }

  peek() {
    return this.linkedList.head.value;
  }

  isEmpty() {
    return this.linkedList.head === null;
  }
}

module.exports = Queue;