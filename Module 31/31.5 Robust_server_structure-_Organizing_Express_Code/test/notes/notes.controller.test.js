const path = require("path");
const controller = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/notes/notes.controller"
));

describe("notes controller", () => {
  describe("create", () => {
    test("export is an array including middleware", async () => {
      expect(controller.create.length).toBeGreaterThan(1);
    });
  });

  describe("read", () => {
    test("export is an array including middleware", async () => {
      expect(controller.read.length).toBeGreaterThan(1);
    });
  });

  describe("update", () => {
    test("export is an array including middleware", async () => {
      expect(controller.update.length).toBeGreaterThan(1);
    });
  });

  describe("delete", () => {
    test("export is an array including middleware", async () => {
      expect(controller.delete.length).toBeGreaterThan(1);
    });
  });

  describe("list", () => {
    test("export is a function", async () => {
      expect(controller.list).toBeInstanceOf(Function);
    });
  });
});
