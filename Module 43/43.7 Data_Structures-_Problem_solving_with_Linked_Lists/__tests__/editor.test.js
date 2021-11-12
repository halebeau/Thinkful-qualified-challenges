const LinkedList = require("../src/lib/linkedList");
const Editor = require("../src/editor");

describe("Text Editor", () => {
  describe("constructor", () => {
    it("should create an editor with no text and null cursor", () => {
      const editor = new Editor();
      expect(editor.text).toEqual(new LinkedList());
      expect(editor.cursor).toBeNull();
    });
  });
  describe("insert()", () => {
    it("should insert a character in an empty editor", () => {
      const editor = new Editor();
      editor.insert("a");
      expect(editor.text.length).toEqual(1);
      expect(editor.cursor.value).toEqual("a");
    });

    it("should insert at the end of editor with characters", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.insert("d");
      expect(editor.text.length).toEqual(4);
      expect(editor.cursor.value).toEqual("d");
    });
    it("should insert after head if cursor is at the head", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = editor.text.head;
      editor.insert("d");
      expect(editor.text.length).toEqual(4);
      expect(editor.cursor.value).toEqual("d");
      expect(editor.text.head.value).toEqual("a");
    });

    it("should insert before head if cursor is null", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = null;
      editor.insert("d");
      expect(editor.text.length).toEqual(4);
      expect(editor.cursor.value).toEqual("d");
      expect(editor.text.head.value).toEqual("d");
    });
    it("should return the editor", () => {
      const editor = new Editor();
      const actual = editor.insert("a");
      expect(actual).toEqual(editor);
    });
  });
  describe("delete()", () => {
    it("should do nothing if editor is empty", () => {
      const editor = new Editor();
      editor.delete();
      expect(editor.text.length).toEqual(0);
      expect(editor.cursor).toBeNull();
    });
    it("should delete the head of the editor", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = editor.text.head;
      editor.delete();
      expect(editor.text.length).toEqual(2);
      expect(editor.cursor).toBeNull();
      expect(editor.text.head.value).toEqual("b");
    });
    it("should delete nothing prior to head of the editor", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = null;
      editor.delete();
      expect(editor.text.length).toEqual(3);
      expect(editor.cursor).toBeNull();
      expect(editor.text.head.value).toEqual("a");
    });
    it("should delete at the end of the editor", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.delete();
      expect(editor.text.length).toEqual(2);
      expect(editor.cursor.value).toEqual("b");
      expect(editor.text.head.value).toEqual("a");
    });
    it("should return the editor", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = null;
      const actual = editor.delete();
      expect(actual).toEqual(editor);
    });
  });
  describe("arrowLeft()", () => {
    it("should do nothing with empty editor", () => {
      const editor = new Editor();
      editor.arrowLeft();
      expect(editor.text.length).toEqual(0);
      expect(editor.cursor).toBeNull();
    });
    it("should move before head from head", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = editor.text.head;
      editor.arrowLeft();
      expect(editor.text.length).toEqual(3);
      expect(editor.cursor).toBeNull();
      expect(editor.text.head.value).toEqual("a");
    });
    it("should move left", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.arrowLeft();
      expect(editor.text.length).toEqual(3);
      expect(editor.cursor.value).toEqual("b");
      expect(editor.text.head.value).toEqual("a");
    });
    it("should return the editor", () => {
      const editor = new Editor(["a", "b"]);
      editor.cursor = null;
      const actual = editor.arrowLeft();
      expect(actual).toEqual(editor);
    });
  });
  describe("arrowRight()", () => {
    it("should do nothing with empty editor", () => {
      const editor = new Editor();
      editor.arrowRight();
      expect(editor.text.length).toEqual(0);
      expect(editor.cursor).toBeNull();
    });

    it("should move to head from before head", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = null;
      editor.arrowRight();
      expect(editor.text.length).toEqual(3);
      expect(editor.cursor.value).toEqual("a");
      expect(editor.text.head.value).toEqual("a");
    });
    it("should move right", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.cursor = editor.text.head;
      editor.arrowRight();
      expect(editor.text.length).toEqual(3);
      expect(editor.cursor.value).toEqual("b");
      expect(editor.text.head.value).toEqual("a");
    });
    it("should not move past end of editor", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      editor.arrowRight();
      expect(editor.text.length).toEqual(3);
      expect(editor.cursor.value).toEqual("c");
      expect(editor.text.head.value).toEqual("a");
    });
    it("should return the editor", () => {
      const editor = new Editor(new LinkedList(["a", "b", "c"]));
      const actual = editor.arrowRight();
      expect(actual).toEqual(editor);
    });
  });
});
