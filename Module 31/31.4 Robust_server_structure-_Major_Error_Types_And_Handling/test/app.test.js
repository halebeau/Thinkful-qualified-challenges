const request = require("supertest");
const notes = require("../src/data/notes-data");

const path = require("path");
const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));

describe("App", () => {
  beforeEach(() => {
    notes.splice(0, notes.length);
  });

  describe("not found handler", () => {
    test("returns 404 for non-existent note", async () => {
      const response = await request(app)
        .get("/notes/99")
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("99");
    });
    test("returns 404 for non-existent route", async () => {
      const response = await request(app)
        .get("/gregarious")
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Not found: /gregarious");
    });
  });

  describe("error handler", () => {
    test("returns status code 500 by default", async () => {
      const expected = { message: "Did something happen?" };

      const notesLayer = app._router.stack
        .filter((layer) => "/notes" === (layer.route || {}).path)
        .find((layer) => layer.route.methods.get);

      const handleSpy = jest.spyOn(notesLayer, "handle");

      handleSpy.mockImplementationOnce((request, response, next) => {
        next(expected);
      });

      const response = await request(app)
        .get("/notes")
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual(expected.message);
    });

    test("returns status code and message from error object", async () => {
      const expected = { status: 418, message: "Am I a Teapot?" };

      const notesLayer = app._router.stack
        .filter((layer) => "/notes" === (layer.route || {}).path)
        .find((layer) => layer.route.methods.get);

      const handleSpy = jest.spyOn(notesLayer, "handle");

      handleSpy.mockImplementationOnce((request, response, next) => {
        next(expected);
      });

      const response = await request(app)
        .get("/notes")
        .set("Accept", "application/json");

      expect(response.status).toBe(418);
      expect(response.body.error).toEqual(expected.message);
    });

    describe("path /notes/:noteId", () => {
      describe("GET method", () => {
        test("returns an existing note", async () => {
          const expected = {
            id: 42,
            text: "The ultimate question of life, the universe, and everything",
          };

          notes.push(
            {
              id: 0,
              text: "Should not appear",
            },
            expected
          );

          const response = await request(app)
            .get("/notes/42")
            .set("Accept", "application/json");

          expect(response.status).toBe(200);
          expect(response.body.data).toEqual(expected);
        });
        test("returns an error for non-existent note", async () => {
          const response = await request(app)
            .get("/notes/77")
            .set("Accept", "application/json");

          expect(response.status).toBeGreaterThanOrEqual(400);
        });
      });
      describe("POST method", () => {
        test("returns an error", async () => {
          notes.push({ id: 1, text: "POST should not be successful" });
          const response = await request(app)
            .post("/notes/:noteId")
            .set("Accept", "application/json")
            .send({ data: { text: "POST should not be successful" } });

          expect(response.status).toBeGreaterThanOrEqual(400);
        });
      });
    });

    describe("POST /notes", () => {
      test("returns 400 if text is missing", async () => {
        const response = await request(app)
          .post("/notes")
          .set("Accept", "application/json")
          .send({ data: { message: "returns 400 if text is missing" } });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain("text");
      });

      test("returns 400 if text is empty", async () => {
        const response = await request(app)
          .post("/notes")
          .set("Accept", "application/json")
          .send({ data: { text: "" } });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain("text");
      });

      test("returns 400 if data is missing", async () => {
        const response = await request(app)
          .post("/notes")
          .set("Accept", "application/json")
          .send({ datum: { text: "creates a new note and assigns id" } });

        expect(response.status).toBe(400);
        expect(response.body.error).not.toBeUndefined();
      });
    });
  });
});
