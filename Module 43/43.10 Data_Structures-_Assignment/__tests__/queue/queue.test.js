const RegularQueue = require("../../src/queue/queue.js");
const LinkedListQueue = require("../../src/linked-list/queue");

describe.each([
  ["src/queue/queue", RegularQueue],
  ["src/linked-list/queue", LinkedListQueue],
])("%# Queue(%s)", (path, Queue) => {
  test("starts empty", () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toBe(true);
  });

  describe("enqueue", () => {
    test('"apple"', () => {
      const queue = new Queue();

      queue.enqueue("apple");

      expect(queue.peek()).toBe("apple");
      expect(queue.isEmpty()).toBe(false);
    });

    test('"apple" and "orange"', () => {
      const queue = new Queue();

      queue.enqueue("apple");
      queue.enqueue("orange");

      expect(queue.peek()).toBe("apple");
      expect(queue.isEmpty()).toBe(false);
    });
  });

  describe("dequeue", () => {
    test("only node to make empty queue", () => {
      const queue = new Queue();
      queue.enqueue("first");

      const actual = queue.dequeue();

      expect(actual).toBe("first");
      expect(queue.isEmpty()).toBe(true);
    });

    test("one node", () => {
      const queue = new Queue();
      queue.enqueue("first");
      queue.enqueue("second");

      const actual = queue.dequeue();

      expect(actual).toBe("first");
      expect(queue.peek()).toBe("second");
      expect(queue.isEmpty()).toBe(false);
    });

    test("multiple nodes", () => {
      const queue = new Queue();
      queue.enqueue("first");
      queue.enqueue("middle");
      queue.enqueue("last");

      queue.dequeue();
      const actual = queue.dequeue();

      expect(actual).toBe("middle");
      expect(queue.peek()).toBe("last");
      expect(queue.isEmpty()).toBe(false);
    });

    test("all nodes", () => {
      const queue = new Queue();
      queue.enqueue("first");
      queue.enqueue("middle");
      queue.enqueue("last");

      queue.dequeue();
      queue.dequeue();
      const actual = queue.dequeue();

      expect(actual).toBe("last");
      expect(queue.isEmpty()).toBe(true);
    });
  });
});

describe("Queue(src/linked-list/queue)", () => {
  test("enqueue delegates to linked list", () => {
    const queue = new LinkedListQueue();
    const spy = jest.spyOn(queue.linkedList, "insert");
    queue.enqueue("new-value");
    expect(spy).toHaveBeenCalledWith("new-value");
  });

  test("dequeue delegates to linked list", () => {
    const queue = new LinkedListQueue();
    const spy = jest.spyOn(queue.linkedList, "remove");
    queue.enqueue("new-value");

    const actual = queue.dequeue();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(actual).toBe("new-value");
  });
});
