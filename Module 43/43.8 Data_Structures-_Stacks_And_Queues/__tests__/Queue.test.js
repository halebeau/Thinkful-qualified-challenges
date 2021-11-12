const Queue = require("../src/Queue");

describe("Queue", () => {
  let queue;
  beforeEach(() => {
    queue = new Queue();
    queue.enqueue("apple");
    queue.enqueue("orange");
    queue.enqueue("banana");
    queue.enqueue("pineapple");
    queue.enqueue("kiwi");
    queue.enqueue("watermelon");
  });

  test("should have methods named 'enqueue()', and 'dequeue()'' ", () => {
    expect(typeof queue.enqueue).toEqual("function");
    expect(typeof queue.dequeue).toEqual("function");
  });

  test("should correctly insert a fruit into the queue", () => {
    expect(queue.first.value).toEqual("apple");
    expect(queue.last.value).toEqual("watermelon");
    queue.enqueue("grapes");
    expect(queue.last.value).toEqual("grapes");
    expect(queue.first.value).toEqual("apple");

    queue.enqueue("starfruit");
    expect(queue.last.value).toEqual("starfruit");
    expect(queue.first.value).toEqual("apple");
  });

  test("should correctly insert a fruit into an empty queue", () => {
    let queue = new Queue();
    expect(queue.first).toBeNull();
    expect(queue.last).toBeNull();

    queue.enqueue("grapes");
    expect(queue.first.value).toEqual("grapes");
    expect(queue.last.value).toEqual("grapes");

    queue.enqueue("starfruit");
    expect(queue.first.value).toEqual("grapes");
    expect(queue.last.value).toEqual("starfruit");
  });

  test("should correctly remove a fruit from the queue", () => {
    expect(queue.dequeue()).toEqual("apple");
    expect(queue.dequeue()).toEqual("orange");
    expect(queue.dequeue()).toEqual("banana");
    expect(queue.dequeue()).toEqual("pineapple");
    expect(queue.dequeue()).toEqual("kiwi");
    expect(queue.dequeue()).toEqual("watermelon");
    expect(queue.dequeue()).toBeUndefined();
  });
});
