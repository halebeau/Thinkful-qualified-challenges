const request = require("supertest");
const users = require("../src/data/users-data");
const plants = require("../src/data/plants-data");

const app = require("../src/app");
const nextId = require("../src/utils/nextId");

describe("App", () => {
  describe("path /users", () => {
    test("OPTIONS returns access-control-allow-methods=GET and access-control-allow-origin=*", async () => {
      const origin = "http://www.contradiction.com";

      const response = await request(app)
        .options("/users")
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-methods"]).toEqual("GET");
      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.status).toEqual(204);
    });

    test("GET returns access-control-allow-origin=*", async () => {
      const origin = "http://www.progress.com";

      const response = await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.status).toEqual(200);
    });

    test("POST does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.chaos.com";

      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {
            first_name: "Ada",
            last_name: "Lovelace",
            email: "countess@lovelace.com",
            moto: "First!",
          },
        });

      expect(response.headers["access-control-allow-origin"]).toBeUndefined();
      expect(response.body.data).toHaveProperty("first_name", "Ada");
      expect(response.status).toEqual(201);
    });

    test("PUT does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.chaos.com";

      const response = await request(app)
        .put("/users")
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {
            first_name: "Ada",
            last_name: "Lovelace",
            email: "countess@lovelace.com",
            moto: "First!",
          },
        });
      expect(response.headers["access-control-allow-origin"]).toBeUndefined();
      expect(response.body.error).not.toBeUndefined();
      expect(response.status).toEqual(405);
    });
  });

  describe("path /users/:userId", () => {
    test("OPTIONS returns access-control-allow-methods=GET and access-control-allow-origin=*", async () => {
      const origin = "http://www.physics.com";

      const response = await request(app)
        .options("/users/5932dfc9526c4142a5bd550f388634d7")
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-methods"]).toEqual("GET");
      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.status).toEqual(204);
    });

    test("GET returns access-control-allow-origin=*", async () => {
      const origin = "http://www.electronics.com";

      const response = await request(app)
        .get("/users/1f86292bdc3a4999ab612bb292735592")
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.body.data).toHaveProperty(
        "id",
        "1f86292bdc3a4999ab612bb292735592"
      );
      expect(response.status).toEqual(200);
    });

    test("POST does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.series.com";
      const id = nextId();

      const response = await request(app)
        .post(`/users/${id}`)
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {
            first_name: "Ada",
            last_name: "Lovelace",
            email: "countess@lovelace.com",
            moto: "First!",
          },
        });

      expect(response.headers["access-control-allow-origin"]).toBeUndefined();
      expect(response.status).toEqual(405);
    });

    test("DELETE does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.congress.com";

      const id = nextId();

      users.push({
        id,
        first_name: "Delete",
        last_name: "access-control-allow-origin",
        email: "no@access-control-allow-origin.com",
        moto: "Last!",
      });

      const response = await request(app)
        .delete(`/users/${id}`)
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-origin"]).toBeUndefined();
      expect(response.body.data).toBeUndefined();
      expect(response.status).toEqual(204);
    });

    test("PUT does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.chaos.com";

      const id = nextId();

      users.push({
        id,
        first_name: "Adaaaaaaaaaa",
        last_name: "Lovelace",
        email: "countess@lovelace.com",
        moto: "First!",
      });

      const response = await request(app)
        .put(`/users/${id}`)
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {
            first_name: "Ada",
            last_name: "Lovelace",
            email: "countess@lovelace.com",
            moto: "First!",
          },
        });
      expect(response.headers["access-control-allow-origin"]).toBeUndefined();
      expect(response.body.data).toHaveProperty("first_name", "Ada");
      expect(response.status).toEqual(200);
    });
  });

  describe("path /plants", () => {
    test("OPTIONS any method from any origin", async () => {
      const origin = "http://www.mathematics.com";

      const response = await request(app)
        .options("/plants")
        .set("Accept", "application/json")
        .set("Origin", origin)
        .set("Access-Control-Request-Method", "GET");

      expect(response.headers["access-control-allow-methods"]).toEqual(
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      );
      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.status).toBe(204);
    });

    test("GET allows CORS from any origin", async () => {
      const origin = "http://www.fitness.com";

      const response = await request(app)
        .get("/plants")
        .set("Accept", "application/json")
        .set("Origin", origin)
        .set("Access-Control-Request-Method", "GET");

      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.status).toBe(200);
    });

    test("POST return access-control-allow-origin=*", async () => {
      const origin = "http://www.grass.com";

      const response = await request(app)
        .post("/plants")
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {
            name: "false aralia",
            scientific_name: "Plerandra elegantissima",
            family: "Plerandra",
          },
        });

      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.body.data).toHaveProperty("name", "false aralia");
      expect(response.status).toEqual(201);
    });

    test("PUT does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.chaos.com";

      const response = await request(app)
        .put("/plants")
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {},
        });
      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.body.error).not.toBeUndefined();
      expect(response.status).toEqual(405);
    });
  });

  describe("path /plants/:plantId", () => {
    test("OPTIONS returns access-control-allow-methods=* and access-control-allow-origin=*", async () => {
      const origin = "http://www.physics.com";

      const response = await request(app)
        .options("/plants/54576310fee8440f85f4986d7fb4a600")
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-methods"]).toEqual(
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      );
      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.status).toEqual(204);
    });

    test("GET returns access-control-allow-origin=*", async () => {
      const origin = "http://www.electronics.com";

      const response = await request(app)
        .get("/plants/915edf86866b48e0a453012966c26ed3")
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.body.data).toHaveProperty(
        "id",
        "915edf86866b48e0a453012966c26ed3"
      );
      expect(response.status).toEqual(200);
    });

    test("POST returns access-control-allow-origin", async () => {
      const origin = "http://www.series.com";
      const id = nextId();

      const response = await request(app)
        .post(`/plants/${id}`)
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {},
        });

      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.status).toEqual(405);
    });

    test("DELETE does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.congress.com";

      const id = nextId();

      plants.push({
        id,
        name: "Ayahuasca",
        scientific_name: "Banisteriopsis caapi",
        family: "Malpighiaceae",
      });

      const response = await request(app)
        .delete(`/plants/${id}`)
        .set("Accept", "application/json")
        .set("Origin", origin);

      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.body.data).toBeUndefined();
      expect(response.status).toEqual(204);
    });

    test("PUT does NOT return access-control-allow-origin", async () => {
      const origin = "http://www.chaos.com";

      const id = nextId();

      plants.push({
        id,
        name: "Betel nut",
        scientific_name: "Areca catechu",
        family: "palm",
      });

      const response = await request(app)
        .put(`/plants/${id}`)
        .set("Accept", "application/json")
        .set("Origin", origin)
        .send({
          data: {
            name: "Betel nut",
            scientific_name: "Areca catechu",
            family: "Arecaceae",
          },
        });
      expect(response.headers["access-control-allow-origin"]).toEqual("*");
      expect(response.body.data).toHaveProperty("id", id);
      expect(response.status).toEqual(200);
    });
  });
});
