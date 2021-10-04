const path = require("path");
const request = require("supertest");
const urls = require("../src/data/urls-data");
const uses = require("../src/data/uses-data");

const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));

describe("App", () => {
  beforeEach(() => {
    urls.splice(0, urls.length);
    uses.splice(0, uses.length);
  });

  test("for a non-existent URL, returns a 404 status code and an error key set to a message containing the URL", async () => {
    const response = await request(app)
      .get("/40/42")
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.body.error).toContain("42");
  });

  describe("path /urls", () => {
    describe("post method", () => {
      test("creates a new short url and assigns id", async () => {
        const expectedHref = "http://www.contradiction.com";

        const response = await request(app)
          .post("/urls")
          .set("Accept", "application/json")
          .send({ data: { href: expectedHref } });

        expect(response.status).toBe(201);
        expect(response.body.data.href).toEqual(expectedHref);
        expect(response.body.data.id).toBeGreaterThanOrEqual(1);
      });

      test("only href property is stored, others are ignored", async () => {
        const requestData = {
          href: "http://www.guitar.com",
          id: 13,
          rent: "free",
        };

        const response = await request(app)
          .post("/urls")
          .set("Accept", "application/json")
          .send({ data: requestData });
        expect(response.status).toBe(201);
        expect(response.body.data.href).toEqual(requestData.href);
        expect(response.body.data.id).not.toEqual(requestData.id);
        expect(response.body.data.rent).toBeUndefined();
      });

      test("returns a 400 status code and an error key set to a message containing the substring 'href' if the 'href' property is missing", async () => {
        const response = await request(app)
          .post("/urls")
          .set("Accept", "application/json")
          .send({ data: { ferh: "ferh" } });
        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.status).toBeLessThanOrEqual(499);
        expect(response.body.error).toContain("href");
      });
    });

    describe("get method", () => {
      test("returns list of short urls", async () => {
        const expected = { href: "http://www.99.com", id: 99 };

        urls.push(expected);

        const response = await request(app)
          .get("/urls")
          .set("Accept", "application/json");
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([expected]);
      });
    });

    describe("put method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'PUT'", async () => {
        const response = await request(app)
          .put("/urls")
          .set("Accept", "application/json")
          .send({ data: { href: "http://www.forest.com" } });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("PUT");
      });
    });

    describe("delete method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'DELETE'", async () => {
        const response = await request(app)
          .delete("/urls")
          .set("Accept", "application/json");

        expect(response.body.error).toContain("DELETE");
        expect(response.status).toBe(405);
      });
    });
  });

  describe("path /urls/:urlId", () => {
    describe("get method", () => {
      test("returns existing short url", async () => {
        const expected = { href: "http://www.implicit.com", id: 9 };

        urls.push(expected);

        const response = await request(app)
          .get("/urls/9")
          .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });

      test("records use of existing short url", async () => {
        const expected = { href: "http://www.zYLk3mZr.com", id: 10 };

        urls.push(expected);

        const response = await request(app)
          .get("/urls/10")
          .set("Accept", "application/json");

        expect(uses[0]).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            urlId: 10,
            time: expect.any(Number),
          })
        );
      });

      test("for a non-existent id, returns a 404 status code and an error key set to a message containing the id", async () => {
        const expected = { href: "http://www.IEEJG3re.com", id: 11 };

        urls.push(expected);

        const response = await request(app)
          .get("/urls/12")
          .set("Accept", "application/json");

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("12");
      });
    });

    describe("put method", () => {
      test("modifies existing short url", async () => {
        const expected = { href: "http://www.14.com", id: 14 };

        const existing = { href: "http://www.implicit.com", id: 14 };
        urls.push(existing);

        const response = await request(app)
          .put("/urls/14")
          .set("Accept", "application/json")
          .send({ data: expected });

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });

      test("for a non-existent id, returns a 404 status code and an error key set to a message containing the id", async () => {
        const response = await request(app)
          .put("/urls/94")
          .set("Accept", "application/json")
          .send({ data: { href: "http://www.94.com", id: 94 } });

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("94");
      });
    });

    describe("post method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'POST'", async () => {
        const existing = { href: "http://www.26.com", id: 26 };

        urls.push(existing);

        const response = await request(app)
          .post("/urls/26")
          .set("Accept", "application/json")
          .send({ href: "http://www.405-expected.com", id: 26 });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("POST");
      });
    });

    describe("delete method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'DELETE'", async () => {
        const existing = { href: "http://www.1eJGT3lA.com", id: 31 };

        urls.push(existing);

        const response = await request(app)
          .delete("/urls/31")
          .set("Accept", "application/json");

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("DELETE");
      });
    });
  });

  describe("path /urls/:urlId/uses", () => {
    describe("get method", () => {
      test("returns list of uses for short url id", async () => {
        const expected = {
          id: 64,
          urlId: 5,
          time: 2651945554015,
        };

        urls.push({ href: "http://www.salmon.com", id: 5 });
        uses.push(expected);

        const response = await request(app)
          .get("/urls/5/uses")
          .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([expected]);
      });

      test("for a non-existent short url id, returns a 404 status code and an error key set to a message containing the short url id", async () => {
        const response = await request(app)
          .get("/urls/65/uses")
          .set("Accept", "application/json");

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("65");
      });
    });

    describe("put method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'PUT'", async () => {
        const existing = { href: "http://www.66.com", id: 66 };

        urls.push(existing);

        const response = await request(app)
          .put("/urls/66/uses")
          .set("Accept", "application/json")
          .send({ data: { href: "http://www.405-expected.com", id: 66 } });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("PUT");
      });
    });

    describe("post method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'POST'", async () => {
        const existing = { href: "http://www.67.com", id: 67 };

        urls.push(existing);

        const response = await request(app)
          .post("/urls/67/uses")
          .set("Accept", "application/json")
          .send({ data: { href: "http://www.405-expected.com", id: 67 } });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("POST");
      });
    });

    describe("delete method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'DELETE'", async () => {
        const existing = { href: "http://www.68.com", id: 68 };

        urls.push(existing);

        const response = await request(app)
          .delete("/urls/68/uses")
          .set("Accept", "application/json");

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("DELETE");
      });
    });
  });

  describe("path /urls/:urlId/uses/:useId", () => {
    describe("get method", () => {
      test("returns use for short url id and use id", async () => {
        const expected = {
          id: 71,
          urlId: 1,
          time: 2651945554015,
        };

        urls.push({ href: "http://www.rM7wJIzz.com", id: 1 });
        uses.push(expected);

        const response = await request(app)
          .get("/urls/1/uses/71")
          .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });

      test("for a non-existent use id, returns a 404 status code and an error key set to a message containing the use id", async () => {
        urls.push({ href: "http://www.27.com", id: 72 });

        const response = await request(app)
          .get("/urls/72/uses/1")
          .set("Accept", "application/json");

        expect(response.status).toBe(404);
        expect(response.body.error).toContain(1);
      });

      test("returns 404 and an error key set to a message containing the url id if url id does not exist", async () => {
        uses.push({
          id: 73,
          urlId: 3,
          time: 3000809987869,
        });
        urls.push({ href: "http://www.73.com", id: 73 });
        urls.push({ href: "http://www.74.com", id: 74 });

        const response = await request(app)
          .get("/urls/72/uses/3")
          .set("Accept", "application/json");

        expect(response.status).toBe(404);
        expect(response.body.error).toContain(72);
      });

      test("for a mismatched short url and use ids, returns a 404 status code and an error key set to a message containing the use id", async () => {
        const expected = {
          id: 73,
          urlId: 3,
          time: 3000809987869,
        };

        uses.push(expected);
        urls.push({ href: "http://www.73.com", id: 73 });
        urls.push({ href: "http://www.74.com", id: 74 });

        const response = await request(app)
          .get("/urls/74/uses/3")
          .set("Accept", "application/json");

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("3");
      });
    });

    describe("put method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'PUT'", async () => {
        const expected = {
          id: 75,
          urlId: 7,
          time: 3833983016102,
        };

        uses.push(expected);
        urls.push({ href: "http://www.7.com", id: 7 });

        const response = await request(app)
          .put("/urls/7/uses/75")
          .set("Accept", "application/json")
          .send({
            data: {
              ...expected,
              time: 4197803781233,
            },
          });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("PUT");
      });
    });

    describe("post method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'POST'", async () => {
        const expected = {
          id: 76,
          urlId: 6,
          time: 3833983016102,
        };

        uses.push(expected);

        urls.push({ href: "http://www.6.com", id: 6 });

        const response = await request(app)
          .post("/urls/6/uses/76")
          .set("Accept", "application/json")
          .send({
            data: {
              ...expected,
              time: 2427983780983,
            },
          });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("POST");
      });
    });

    describe("delete method", () => {
      test("returns 204 for existing use id", async () => {
        const expected = {
          id: 78,
          urlId: 5,
          time: 3833983016102,
        };

        uses.push(expected);

        urls.push({ href: "http://www.5.com", id: 5 });

        const response = await request(app)
          .delete("/urls/5/uses/78")
          .set("Accept", "application/json");

        expect(response.status).toBe(204);
        expect(response.body.data).toBeUndefined();
      });
    });
  });

  describe("path /uses", () => {
    describe("post method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'POST'", async () => {
        const existing = { href: "http://www.80.com", id: 80 };

        urls.push(existing);

        const response = await request(app)
          .post("/uses")
          .set("Accept", "application/json")
          .send({
            data: {
              urlId: 80,
              time: 2465563276658,
            },
          });

        expect(response.body.error).toContain("POST");
        expect(response.status).toBe(405);
      });
    });
    describe("get method", () => {
      test("returns a list of all uses", async () => {
        const expected = [
          {
            id: 81,
            urlId: 2,
            time: 3251278338233,
          },
          {
            id: 82,
            urlId: 3,
            time: 3243791618959,
          },
        ];

        expected.forEach((use) => uses.push(use));

        const response = await request(app)
          .get("/uses")
          .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });
    });

    describe("put method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'PUT'", async () => {
        const expected = {
          id: 84,
          urlId: 4,
          time: 1773180103451,
        };

        uses.push(expected);

        const response = await request(app)
          .put("/uses")
          .set("Accept", "application/json")
          .send({ data: expected });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("PUT");
      });
    });
    describe("delete method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'DELETE'", async () => {
        const response = await request(app)
          .delete("/uses")
          .set("Accept", "application/json");

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("DELETE");
      });
    });
  });
  describe("path /uses/:useId", () => {
    describe("post method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'POST'", async () => {
        uses.push({
          id: 91,
          urlId: 1,
          time: 4163400708153,
        });

        const response = await request(app)
          .post("/uses/91")
          .set("Accept", "application/json")
          .send({
            data: {
              id: 91,
              urlId: 1,
              time: 2465563276658,
            },
          });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("POST");
      });
    });
    describe("get method", () => {
      test("returns use for the specified id", async () => {
        const expected = {
          id: 92,
          urlId: 2,
          time: 3305133422074,
        };
        uses.push(expected);
        uses.push({
          id: 93,
          urlId: 3,
          time: 1744110978540,
        });

        const response = await request(app)
          .get("/uses/92")
          .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });
    });
    describe("put method", () => {
      test("returns a 405 status code and an error key set to a message containing the substring 'PUT' ", async () => {
        uses.push({
          id: 93,
          urlId: 3,
          time: 2710635442062,
        });

        const response = await request(app)
          .put("/uses/93")
          .set("Accept", "application/json")
          .send({
            data: {
              urlId: 3,
              time: 1835346580618,
            },
          });

        expect(response.status).toBe(405);
        expect(response.body.error).toContain("PUT");
      });
    });
    describe("delete method", () => {
      test("returns 204 for existing use id", async () => {
        const expected = {
          id: 95,
          urlId: 5,
          time: 3818269435890,
        };

        uses.push(expected);

        const response = await request(app)
          .delete("/uses/95")
          .set("Accept", "application/json");

        expect(response.status).toBe(204);
        expect(response.body.data).toBeUndefined();
      });
      test("returns 404 for non-existent use id", async () => {
        const response = await request(app)
          .delete("/uses/9600")
          .set("Accept", "application/json");

        expect(response.status).toBe(404);
        expect(response.body.data).toBeUndefined();
        expect(response.body.error).toBeDefined();
      });
    });
  });
});
