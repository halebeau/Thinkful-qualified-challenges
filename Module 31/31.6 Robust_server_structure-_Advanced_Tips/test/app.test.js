const path = require("path");
const request = require("supertest");
const notes = require("../src/data/notes-data");
const ratings = require("../src/data/ratings-data");

const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));

const ATTACHED_PATH_NOTES = "/notes";
const ATTACHED_PATH_RATINGS = "/ratings";

describe("App", () => {
  beforeEach(() => {
    notes.splice(0, notes.length);
    ratings.splice(0, ratings.length);
  });
    
  describe("path /notes", () => {
    test("delete returns 405", async () => {
      const response = await request(app)
        .delete(ATTACHED_PATH_NOTES)
        .set("Accept", "application/json")
        .send({ data: { text: "PUT to /notes returns 405" } });
      
      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
    test("put returns 405", async () => {
      const response = await request(app)
        .put(ATTACHED_PATH_NOTES)
        .set("Accept", "application/json")
        .send({ data: { text: "PUT to /notes returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
  });

  describe("path /notes/:noteId", () => {
    test("post returns 405", async () => {
      notes.push({
        id: 1,
        text: "path /notes/:noteId post returns 405",
      });

      const response = await request(app)
        .post(`${ATTACHED_PATH_NOTES}/1`)
        .set("Accept", "application/json")
        .send({ data: { text: "POST to /notes/1 returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
  });

  describe("path /notes/:noteId/ratings", () => {
    test("get returns list of ratings", async () => {
      const expected = [
        {
          id: 11,
          noteId: 2,
          stars: 1,
          comment: "Note 11",
        },
        {
          id: 12,
          noteId: 2,
          stars: 12,
          comment: "Note 12",
        },
      ];
      notes.push({
        id: 2,
        text: "path /notes/:notesId/ratings returns list of ratings",
      });

      ratings.push(
        {
          id: 10,
          noteId: 1,
          stars: 0,
          comment: "Note 10",
        },
        ...expected
      );

      const response = await request(app)
        .get(`${ATTACHED_PATH_NOTES}/2/ratings`)
        .set("Accept", "application/json");
      
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expected);
    });
  });

  describe("path /notes/:notesId/ratings/:ratingId", () => {
    test("get returns one rating", async () => {
      const expected = {
        id: 13,
        noteId: 31,
        stars: 4,
        comment: "Note 13",
      };

      notes.push({
        id: 31,
        text: "path /notes/:notesId/ratings/:ratingId returns one rating",
      });

      ratings.push(
        {
          id: 23,
          noteId: 1,
          stars: 0,
          comment: "Note 23",
        },
        expected
      );

      const response = await request(app)
        .get(`${ATTACHED_PATH_NOTES}/31/ratings/13`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expected);
    });

    test("get returns 404 if :noteId does not exist", async () => {
      const expected = {
        id: 14,
        noteId: 41,
        stars: 4,
        comment: "Note 41",
      };

      notes.push({
        id: 41,
        text:
          "path /notes/:notesId/ratings/:ratingId returns 404 if :noteId does not exist",
      });

      ratings.push(expected);

      const response = await request(app)
        .get(`${ATTACHED_PATH_NOTES}/40/ratings/14`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("40");
    });

    test("get returns 404 if :ratingId does not exist", async () => {
      const expected = {
        id: 15,
        noteId: 51,
        stars: 4,
        comment: "Note 51",
      };

      notes.push({
        id: 51,
        text:
          "path /notes/:notesId/ratings/:ratingId returns 404 if :ratingId does not exist",
      });

      ratings.push(expected);

      const response = await request(app)
        .get(`${ATTACHED_PATH_NOTES}/51/ratings/16`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("16");
    });
  });
  
  describe("path /ratings", () => {    
    test("get returns all ratings", async () => {
      ratings.push(
        {
          id: 1,
          noteId: 1,
          stars: 5,
          comment:
            "This note is awesome! Thanks for the great service. You guys rock!",
        }, 
        {
          id: 2,
          noteId: 1,
          stars: 5,
          comment:
            "I would gladly pay over 600 dollars for this note. This note did exactly what you said it does.",
        }, 
        {
          id: 3,
          noteId: 2,
          stars: 4,
          comment: "I don't always clop, but when I do, it's because of this note.",
        }
      );
      const response = await request(app)
        .get(`${ATTACHED_PATH_RATINGS}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(ratings);
    });

    test("delete returns 405", async () => {
      const response = await request(app)
        .delete(ATTACHED_PATH_RATINGS)
        .set("Accept", "application/json")
        .send({ data: { text: "DELETE to /ratings returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });

    test("put returns 405", async () => {
      const response = await request(app)
        .put(ATTACHED_PATH_RATINGS)
        .set("Accept", "application/json")
        .send({ data: { text: "PUT to /ratings returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
  
    test("post returns 405", async () => {
      const response = await request(app)
        .post(ATTACHED_PATH_RATINGS)
        .set("Accept", "application/json")
        .send({ data: { text: "POST to /ratings returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
  });
  
  describe("path /ratings/:ratingId", () => {
    test("get returns one rating", async () => {
      ratings.push({
        id: 1,
        noteId: 1,
        stars: 5,
        comment:
          "This note is awesome! Thanks for the great service. You guys rock!",
      });
      const response = await request(app)
        .get(`${ATTACHED_PATH_RATINGS}/1`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(ratings[0]);
    });
    
    test("put returns 405", async () => {
      ratings.push({
        id: 1,
        text: "path /ratings/:ratingId put returns 405",
      });

      const response = await request(app)
        .put(`${ATTACHED_PATH_RATINGS}/1`)
        .set("Accept", "application/json")
        .send({ data: { text: "PUT to /ratings/1 returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
    
    test("post returns 405", async () => {
      ratings.push({
        id: 1,
        text: "path /ratings/:ratingId post returns 405",
      });

      const response = await request(app)
        .post(`${ATTACHED_PATH_RATINGS}/1`)
        .set("Accept", "application/json")
        .send({ data: { text: "POST to /ratings/1 returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
    
    test("delete returns 405", async () => {
      ratings.push({
        id: 1,
        text: "path /ratings/:ratingId post returns 405",
      });

      const response = await request(app)
        .delete(`${ATTACHED_PATH_RATINGS}/1`)
        .set("Accept", "application/json")
        .send({ data: { text: "DELETE to /ratings/1 returns 405" } });

      expect(response.status).toBe(405);
      expect(response.body.error).not.toBeUndefined();
    });
  });

});
