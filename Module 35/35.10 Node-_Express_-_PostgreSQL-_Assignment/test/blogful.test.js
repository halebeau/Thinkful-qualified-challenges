const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("Blogful Routes", () => {
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

  describe("GET /comments", () => {
    it("should return a list of all comments by default", async () => {
      const response = await request(app).get("/comments");

      expect(response.body.error).toBeUndefined();
      expect(response.body.data.length).toEqual(100);
      expect(response.statusCode).toBe(200);
    });

    it("should return the comment count, grouped by commenter_email, for the path `/comments/commenter-count`", async () => {
      const response = await request(app).get("/comments/commenter-count");
      expect(response.body.error).toBeUndefined();

      expect(response.body.data).toEqual([
        { commenter_email: "lamentcreevy@hotmail.com", count: 30 },
        { commenter_email: "nutsweekly@yahoo.com", count: 17 },
        { commenter_email: "skonespepsi@gmail.com", count: 19 },
        { commenter_email: "spibsgift@gmail.com", count: 18 },
        { commenter_email: "theirstryver@net.com", count: 16 },
      ]);
    });
  });

  describe("GET /comments/:commentId", () => {
    it("should return a 404 if the ID given does not match any ID in the database", async () => {
      const response = await request(app).get("/comments/9999");

      expect(response.body.error).toContain("Comment cannot be found");
      expect(response.statusCode).toEqual(404);
    });

    it("should include specified columns from comments, users, and posts", async () => {
      const response = await request(app).get("/comments/1");

      expect(response.body.error).toBeUndefined();

      const { data } = response.body;

      expect(data).toEqual(
        expect.objectContaining({
          comment: expect.stringContaining(
            "Morbi quis tortor id nulla ultrices aliquet."
          ),
          comment_id: 1,
          commented_post: expect.stringContaining(
            "Integer ac leo. Pellentesque ultrices mattis odio."
          ),
          commenter_email: "nutsweekly@yahoo.com",
        })
      );
    });
  });

  describe("POST /posts", () => {
    it("should create a new post", async () => {
      const data = {
        post_title: "a new post title",
        post_body: "a new post body",
      };

      const response = await request(app)
        .post(`/posts`)
        .send({ data })
        .set("Accept", "application/json");

      expect(response.body.data).toEqual(
        expect.objectContaining({
          ...data,
          post_id: expect.any(Number),
        })
      );
    });
  });

  describe("PUT /posts/:postId", () => {
    it("should update a post", async function () {
      const previous = await knex("posts").first();

      const data = {
        post_id: previous.post_id,
        post_title: "an updated post title",
        post_body: "an updated post body",
      };

      const response = await request(app)
        .put(`/posts/${data.post_id}`)
        .send({
          data,
        })
        .set("Accept", "application/json");

      expect(response.body.data).toEqual(expect.objectContaining(data));
    });
  });

  describe("DELETE /posts/:postId", () => {
    it("should delete the post record with the given ID", async function () {
      const previous = await knex("posts").first();
      const response = await request(app).delete(`/posts/${previous.post_id}`);

      expect(response.statusCode).toEqual(204);

      const notFound = await knex("posts")
        .where({
          post_id: previous.post_id,
        })
        .first();

      expect(notFound).toBeUndefined();
    });
  });
});
