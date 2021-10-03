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

  test("returns error message for non-existent note", async () => {
    const response = await request(app)
      .get("/notes/99")
      .set("Accept", "application/json");

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.text).toContain("Note id not found: 99");
  });

  test("returns error message for non-existent route", async () => {
    const response = await request(app)
      .get("/physics")
      .set("Accept", "application/json");

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.text).toContain("Not found: /physics");
  });

  describe("path /notes", () => {
    describe("GET method", () => {
      test("returns an array of notes", async () => {
        const expected = [
          { id: 5, text: "5 is the number of platonic solids" },
          {
            id: 6,
            text:
              "6 is a unitary perfect number, a harmonic divisor number and a highly composite number.",
          },
        ];

        notes.push(...expected);

        const response = await request(app)
          .get("/notes")
          .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });
    });
    describe("POST method", () => {
      test("creates a new note and assigns id", async () => {
        const response = await request(app)
          .post("/notes")
          .set("Accept", "application/json")
          .send({ data: { text: "creates a new note and assigns id" } });

        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeGreaterThanOrEqual(1);
        expect(response.body.data.text).toEqual(
          "creates a new note and assigns id"
        );
      });

      test("returns 400 if text is missing", async () => {
        const response = await request(app)
          .post("/notes")
          .set("Accept", "application/json")
          .send({ data: { message: "returns 400 if text is missing" } });

        expect(response.status).toBe(400);
      });

      test("returns 400 if text is empty", async () => {
        const response = await request(app)
          .post("/notes")
          .set("Accept", "application/json")
          .send({ data: { text: "" } });

        expect(response.status).toBe(400);
      });

      test("returns 400 if data is missing", async () => {
        const response = await request(app)
          .post("/notes")
          .set("Accept", "application/json")
          .send({ datum: { text: "creates a new note and assigns id" } });

        expect(response.status).toBe(400);
      });
    });
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
});
