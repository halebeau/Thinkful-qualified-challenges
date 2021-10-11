const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("Restaurant Routes", () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  });

  describe("POST /restaurants", () => {
    it("returns 201 and creates a new restaurant", async () => {
      const data = {
        restaurant_name: "Wong's Fancy Peking Duck",
        cuisine: "Chinese",
        address: "7225 Pacific Ave. York, PA 17402",
      };

      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toBeUndefined();
      expect(response.body.data).toEqual(expect.objectContaining(data));
      expect(response.statusCode).toBe(201);
    });

    it("return 400 error if restaurant_name is missing", async () => {
      const data = {
        cuisine: "American",
        address: "169  Bungalow Road, Omaha, NE 68104",
      };

      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("restaurant_name");
      expect(response.body.data).toBeUndefined();
      expect(response.statusCode).toEqual(400);
    });

    it("return 400 error if restaurant_name is empty", async () => {
      const data = {
        restaurant_name: "",
        cuisine: "Pizza",
        address: "3370  Broaddus Avenue, Battle Creek, MI 49015",
      };

      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("restaurant_name");
      expect(response.statusCode).toEqual(400);
    });

    it("return 400 error if cuisine is missing", async () => {
      const data = {
        restaurant_name: "Burger in the box",
        address: "4306 Indiana Avenue, Commercial Capehart, HI 96786",
      };

      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("cuisine");
      expect(response.statusCode).toEqual(400);
    });

    it("return 400 error if cuisine is empty", async () => {
      const data = {
        restaurant_name: "Chili King",
        cuisine: "",
        address: "3162 Prospect Street, Camden, NJ 08104",
      };

      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("cuisine");
      expect(response.statusCode).toEqual(400);
    });

    it("return 400 error if address is missing", async () => {
      const data = {
        restaurant_name: "Dino's Giros",
        cuisine: "Greek",
      };

      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("address");
      expect(response.statusCode).toEqual(400);
    });

    it("return 400 error if address is empty", async () => {
      const data = {
        restaurant_name: "Burger Sushi",
        cuisine: "Sushi",
        address: "",
      };

      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("address");
      expect(response.statusCode).toEqual(400);
    });

    it("return 400 data contains an invalid property", async () => {
      const data = {
        restaurant_name: "Wong's Fancy Peking Duck",
        cuisine: "Chinese",
        address: "7225 Pacific Ave. York, PA 17402",
        not_supported: "value for invalid property",
      };
      const response = await request(app)
        .post(`/restaurants`)
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("not_supported");
      expect(response.body.data).toBeUndefined();
      expect(response.statusCode).toEqual(400);
    });
  });

  describe("DELETE /restaurants/:restuarantId", () => {
    it("returns 204 when restaurantId exists", async () => {
      const previous = await knex("restaurants").first();
      const response = await request(app).delete(
        `/restaurants/${previous.restaurant_id}`
      );

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toEqual(204);

      const notFound = await knex("restaurants")
        .where({
          restaurant_id: previous.restaurant_id,
        })
        .first();
      expect(notFound).toBeUndefined();
    });

    it("returns 404 when restaurantId does not exist", async () => {
      const response = await request(app).delete(`/restaurants/999999`);

      expect(response.body.error).toContain("Restaurant cannot be found.");
      expect(response.statusCode).toEqual(404);
    });
  });
});
