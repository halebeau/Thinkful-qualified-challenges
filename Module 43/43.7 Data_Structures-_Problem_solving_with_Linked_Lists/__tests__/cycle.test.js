const LinkedList = require("../src/lib/linkedList");
const cycle = require("../src/cycle");

describe.only("Cycle", () => {
  it("should return false for empty list", () => {
    const list = new LinkedList();
    expect(cycle(list)).toEqual(false);
  });

  it("should find single node list cycle", () => {
    const list = new LinkedList([1]);
    list.head.next = list.head;
    expect(cycle(list)).toEqual(true);
  });

  it("should return false for no cycle in single node list", () => {
    const list = new LinkedList([1]);
    expect(cycle(list)).toEqual(false);
  });

  it("should find cycle in multi node cyclic list", () => {
    const list = new LinkedList([1, 2, 3, 4, 5]);
    list.find((node) => !node.next).next = list.head;
    expect(cycle(list)).toEqual(true);
  });

  it("should not find cycle in multi node list with no cycle", () => {
    const list = new LinkedList([1, 2, 3, 4, 5]);
    expect(cycle(list)).toEqual(false);
  });

  it("should find cycle in multi node list with small cycle", () => {
    const list = new LinkedList([1, 2, 3, 4, 5]);
    const node1 = list.find((node) => node.value === 3);
    list.find((node) => !node.next).next = node1;
    expect(cycle(list)).toEqual(true);
  });
});
