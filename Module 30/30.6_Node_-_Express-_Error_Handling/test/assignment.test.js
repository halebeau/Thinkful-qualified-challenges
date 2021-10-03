const fs = require("fs");
const path = require("path");
const app = require("../src/app");
const request = require("supertest")

describe("Application Routes", () => {
  describe("Routes", () => {
    describe("/send/:message", () => {
      it("should respond with a message when it is long enough", async () => {
        const response = await request(app).get("/send/message");
        expect(response.text).toEqual("Your message: message");
      });

      it("should not allow messages shorter than three characters", async () => {
        const response = await request(app).get("/send/hi");
        expect(response.text).not.toEqual("Your message: hi");
      });

      it("should return an error for short messages", async () => {
        const response = await request(app).get("/send/hi");
        expect(response.text).toEqual(
          "An error occurred: Your message is too short!"
        );
      });
    });
  });

  describe("Error Handling", () => {
    describe("Request to unknown route", () => {
      it("should respond with a 404 message", async () => {
        const response = await request(app).get("/unknown");
        expect(response.text).toEqual(
          "An error occurred: Could not find route."
        );
      });
    });
  });
});
