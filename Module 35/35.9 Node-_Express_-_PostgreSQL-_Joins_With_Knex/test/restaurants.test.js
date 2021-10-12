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

  it("GET /restaurants should return a list of restaurants and their owners", async () => {
    const response = await request(app).get("/restaurants");

    expect(response.body.data).toHaveLength(100);
    expect(response.body.data[0]).toEqual(
      expect.objectContaining({
        restaurant_name: expect.any(String),
        owner_name: expect.any(String),
        email: expect.any(String),
      })
    );
    expect(response.body.data[response.body.data.length - 1]).toEqual(
      expect.objectContaining({
        restaurant_name: expect.any(String),
        owner_name: expect.any(String),
        email: expect.any(String),
      })
    );
  });

  it("GET /restaurants/average-rating-by-owner should return the average restaurant rating by owner", async () => {
    const response = await request(app).get(
      "/restaurants/average-rating-by-owner"
    );

    expect(response.body.data).toHaveLength(24);
    expect(response.body.data[0]).toEqual(
      expect.objectContaining({
        avg: expect.any(Number),
        owner_name: expect.any(String),
      })
    );
    expect(response.body.data[response.body.data.length - 1]).toEqual(
      expect.objectContaining({
        avg: expect.any(Number),
        owner_name: expect.any(String),
      })
    );
  });
});
