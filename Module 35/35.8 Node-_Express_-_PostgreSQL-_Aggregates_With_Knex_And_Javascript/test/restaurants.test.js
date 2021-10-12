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

  it("GET /restaurants/count should return a count of restaurants", async () => {
    const response = await request(app).get("/restaurants/count");

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toEqual({ count: 100 });
  });

  it("GET /restaurants/average-rating should return an average of all restaurant ratings", async () => {
    const response = await request(app).get("/restaurants/average-rating");

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toEqual({ average_rating: 3.107 });
  });

  it("GET /restaurants/highest-rated should return the restaurant with the highest rating", async () => {
    const response = await request(app).get("/restaurants/highest-rating");

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toEqual({ max_rating: "5.00" });
  });
});
