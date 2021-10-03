const app = require("../src/app");
const request = require('supertest');

describe("Speaker Application", () => {
  describe("Routes", () => {
    describe("/ping", () => {
      it("should respond with pong!", async () => {
        const response = await request(app).get("/ping");
        expect(response.text).toEqual("pong!");
      });
    });

    describe("/welcome", () => {
      it("should respond with a welcome phrase", async () => {
        const response = await request(app).get("/welcome");
        expect(response.text).toEqual("Welcome to my server.");
      });
    });

    describe("Any other route", () => {
      it("should respond with the standard 404 message", async () => {
        return request(app).get("/").expect(404);
      });
    });
  });
});
