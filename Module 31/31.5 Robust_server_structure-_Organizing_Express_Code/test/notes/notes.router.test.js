const request = require("supertest");
const notes = require("../../src/data/notes-data");

const app = require("./router-test-app");

const ATTACHED_PATH = "/notes-router";

describe("notes router", () => {
  beforeEach(() => {
    notes.splice(0, notes.length);
  });

  describe("create method", () => {
    test("creates a new note and assigns id", async () => {
      const response = await request(app)
        .post(ATTACHED_PATH)
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
        .post(ATTACHED_PATH)
        .set("Accept", "application/json")
        .send({ data: { test: "returns 400 if text is missing" } });

      expect(response.status).toBe(400);
    });

    test("returns 400 if text is empty", async () => {
      const response = await request(app)
        .post(ATTACHED_PATH)
        .set("Accept", "application/json")
        .send({ data: { text: "" } });

      expect(response.status).toBe(400);
    });

    test("returns 400 if data is missing", async () => {
      const response = await request(app)
        .post(ATTACHED_PATH)
        .set("Accept", "application/json")
        .send({ datum: { text: "creates a new note and assigns id" } });

      expect(response.status).toBe(400);
    });
  });

  describe("read method", () => {
    test("returns an existing note", async () => {
      const expected = {
        id: 42,
        text: "The ultimate question of life, the universe, and everything",
      };

      notes.push(expected);

      const response = await request(app)
        .get(`${ATTACHED_PATH}/42`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expected);
    });

    test("returns 404 for non-existent note", async () => {
      const response = await request(app)
        .get(`${ATTACHED_PATH}/77`)
        .set("Accept", "application/json");

      expect(response.status).toEqual(404);
    });
  });

  describe("update method", () => {
    test("updates the note", async () => {
      const original = {
        id: 13,
        text: "13 is a fictional character on the Fox medical drama House",
      };

      notes.push(original);

      const expected = {
        id: 13,
        text: "13 is the number of Archimedian solids",
      };

      const response = await request(app)
        .put(`${ATTACHED_PATH}/13`)
        .set("Accept", "application/json")
        .send({ data: expected });

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expected);
    });

    test("returns 400 if text is missing", async () => {
      const original = {
        id: 14,
        text:
          "14 is itself the Aliquot sum of two numbers; the discrete semiprime 22, and the square number 196",
      };

      notes.push(original);

      const response = await request(app)
        .put(`${ATTACHED_PATH}/14`)
        .set("Accept", "application/json")
        .send({
          data: {
            texxt: "Update returns 400 if text property is missing",
          },
        });

      expect(response.status).toBe(400);
    });

    test("returns 400 if text is empty", async () => {
      const original = {
        id: 15,
        text:
          "15 is the smallest number that can be factorized using Shor's quantum algorithm",
      };

      notes.push(original);

      const response = await request(app)
        .put(`${ATTACHED_PATH}/15`)
        .set("Accept", "application/json")
        .send({ data: { text: "" } });

      expect(response.status).toBe(400);
    });

    test("returns 400 if data is missing", async () => {
      const original = {
        id: 16,
        text:
          "16 is the only number of the form x^y = y^x with x and y being different integers",
      };

      notes.push(original);

      const response = await request(app)
        .put(`${ATTACHED_PATH}/16`)
        .set("Accept", "application/json")
        .send({
          datum: { text: "Update returns 400 if data property is missing" },
        });

      expect(response.body.data).toBeUndefined();
      expect(response.status).toBe(400);
    });

    test("returns 404 if note does not exist", async () => {
      const response = await request(app)
        .put(`${ATTACHED_PATH}/13`)
        .set("Accept", "application/json")
        .send({ data: { text: "Update returns 404 if note does not exist" } });

      expect(response.status).toBe(404);
    });
  });

  describe("delete method", () => {
    test("returns 204 for existing note", async () => {
      notes.push({ id: 3, text: "DELETE always returns 204" });
      const response = await request(app)
        .delete(`${ATTACHED_PATH}/3`)
        .set("Accept", "application/json");

      expect(response.status).toBe(204);
      expect(response.body.data).toBeUndefined();
    });
    test("returns 404 for non-existent note", async () => {
      const response = await request(app)
        .delete(`${ATTACHED_PATH}/77`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
    });
  });

  describe("list method", () => {
    test("returns list of notes", async () => {
      const expected = [
        { id: 3, text: "DELETE should not return 404" },
        { id: 4, text: "Search the web for 'What Is Idempotence?'" },
      ];

      notes.push(...expected);

      const response = await request(app)
        .get(ATTACHED_PATH)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expected);
    });
  });
});
