const path = require("path");
const request = require("supertest");
const notes = require("../src/data/notes-data");

const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));

const ATTACHED_PATH = "/notes";

describe("notes router", () => {
  describe("list method", () => {
    test("returns list of notes", async () => {
      const response = await request(app)
        .get(ATTACHED_PATH)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(notes);
    });
  });
});
