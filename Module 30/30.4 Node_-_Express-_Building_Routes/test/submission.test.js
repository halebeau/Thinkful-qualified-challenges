const app = require("../src/app");
const request = require('supertest');

describe("Speaker Application", () => {
  describe("Routes", () => {
    describe("/ping", () => {
      it("should respond with pong!", async () => {
        return request(app).get("/ping").expect(function(res) {
          res.text = "pong!";
        });
      });
    });

    describe("/welcome", () => {
      it("should respond with a welcome phrase", async () => {
        return request(app).get("/welcome").expect(function(res) {
          res.text = "Welcome to my server.";
        });
      });
    });

    describe("Any other route", () => {
      it("should respond with the standard 404 message", async () => {
        return request(app).get("/").expect(404);
      });
    });
  });
});
