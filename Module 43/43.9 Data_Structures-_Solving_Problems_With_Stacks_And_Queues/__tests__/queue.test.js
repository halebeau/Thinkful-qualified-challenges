const Queue = require("../src/lib/queue");

describe("Queue", () => {
  it("should create an empty queue", () => {
    const queue = new Queue();
    expect(queue).toHaveProperty("first");
    expect(queue).toHaveProperty("last");
    expect(queue.first).toBeNull();
    expect(queue.last).toBeNull();
  });

  it("should enqueue a value", () => {
    const queue = new Queue();
    queue.enqueue(1);
    expect(queue.first.value).toEqual(1);
  });

  it("should enqueue a value to the end of queue", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.first.value).toEqual(1);
    expect(queue.last.value).toEqual(3);
  });

  it("should dequeue the first value", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    const returned = queue.dequeue();
    expect(returned).toEqual(1);
    expect(queue.last.value).toEqual(3);
    expect(queue.first.value).toEqual(2);
  });
});
