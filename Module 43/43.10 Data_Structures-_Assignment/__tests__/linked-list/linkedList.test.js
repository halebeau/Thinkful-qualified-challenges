const LinkedList = require("../../src/linked-list/linkedList");

describe("Linked List", () => {
  test("starts empty", () => {
    const linkedList = new LinkedList();

    expect(linkedList).toHaveLength(0);
  });

  describe("insert", () => {
    test('"apple"', () => {
      const linkedList = new LinkedList();

      linkedList.insert("apple");

      expect(linkedList.head.value).toBe("apple");
      expect(linkedList).toHaveLength(1);
    });

    test('"apple" and "orange"', () => {
      const linkedList = new LinkedList();

      linkedList.insert("apple");
      linkedList.insert("orange");

      expect(linkedList.head.value).toBe("apple");
      expect(linkedList.head.next.value).toBe("orange");
      expect(linkedList).toHaveLength(2);
    });

    describe("with isMatch function", () => {
      test("throws exception if no match is found", () => {
        const linkedList = new LinkedList();
        linkedList.insert("Banana");
        expect(() => linkedList.insert("grape", () => false)).toThrowError(
          "No match found"
        );
      });

      test("the middle of the list", () => {
        const linkedList = new LinkedList();
        linkedList.insert("apple").insert("orange");

        linkedList.insert("grape", (node, index) => index === 0);

        expect(linkedList.head.value).toBe("apple");
        expect(linkedList.head.next.value).toBe("grape");
        expect(linkedList.head.next.next.value).toBe("orange");
        expect(linkedList).toHaveLength(3);
      });

      test("the end of the list", () => {
        const linkedList = new LinkedList();
        linkedList
          .insert("Cadmium")
          .insert("Californium")
          .insert("Carbon")
          .insert("Cerium");

        linkedList.insert("Cesium", (node, index) => index === 3);

        expect(linkedList.head.next.next.next.next.value).toBe("Cesium");
        expect(linkedList).toHaveLength(5);
      });
    });
  });

  describe("find", () => {
    test("by value", () => {
      const linkedList = new LinkedList();
      linkedList.insert("Actinium").insert("Aluminum");

      const node = linkedList.find((node) => node.value === "Aluminum");

      expect(node.value).toBe("Aluminum");
      expect(node.next).toBeNull();
    });

    test("by index", () => {
      const linkedList = new LinkedList();
      linkedList
        .insert("Berkelium")
        .insert("Beryllium")
        .insert("Bismuth")
        .insert("Bohrium");

      const node = linkedList.find((node, index) => index === 2);

      expect(node.value).toBe("Bismuth");
      expect(node.next.value).toBe("Bohrium");
    });
  });

  describe("remove", () => {
    test("head to make empty list", () => {
      const linkedList = new LinkedList();
      linkedList.insert("head");

      const actual = linkedList.remove((node) => node.value === "head");

      expect(actual).toBe("head");
      expect(linkedList.head).toBeNull();
      expect(linkedList).toHaveLength(0);
    });

    test("first node in list", () => {
      const linkedList = new LinkedList();
      linkedList.insert("first");
      linkedList.insert("second");

      const actual = linkedList.remove((node) => node.value === "first");

      expect(actual).toBe("first");
      expect(linkedList.head.value).toBe("second");
      expect(linkedList).toHaveLength(1);
    });

    test("last node in list", () => {
      const linkedList = new LinkedList();
      linkedList.insert("first");
      linkedList.insert("middle");
      linkedList.insert("last");

      const actual = linkedList.remove((node) => node.value === "last");

      expect(actual).toBe("last");
      expect(linkedList.head.value).toBe("first");
      expect(linkedList.head.next.next).toBeNull();
      expect(linkedList).toHaveLength(2);
    });

    test("middle node in list", () => {
      const linkedList = new LinkedList();
      linkedList.insert("first");
      linkedList.insert("middle");
      linkedList.insert("last");

      const actual = linkedList.remove((node) => node.value === "middle");

      expect(actual).toBe("middle");
      expect(linkedList.head.value).toBe("first");
      expect(linkedList.head.next.value).toBe("last");
      expect(linkedList).toHaveLength(2);
    });
  });

  describe("insertAtHead", () => {
    test("on empty list", () => {
      const linkedList = new LinkedList();
      linkedList.insertAtHead(0);
      expect(linkedList.head.value).toBe(0);
    });

    test("twice", () => {
      const linkedList = new LinkedList();
      linkedList.insertAtHead(0);
      linkedList.insertAtHead(1);
      expect(linkedList.head.value).toBe(1);
    });
    test("mixes with insert", () => {
      const linkedList = new LinkedList();
      linkedList.insert(10);
      linkedList.insertAtHead(11);
      linkedList.insert(12);
      linkedList.insertAtHead(13);
      expect(linkedList.head.value).toBe(13);
    });
  });
});
