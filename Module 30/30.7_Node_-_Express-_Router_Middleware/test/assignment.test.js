const request = require("supertest");
const app = require("../src/app");

const validateNameLength = require("../src/utils/validateNameLength");

describe("Application Routes", () => {
  describe("Middleware Requirements", () => {
    it("should use validateNameLength as middleware", () => {
      const middleware = app._router.stack
        .filter((layer) => layer.route)
        .flatMap((layer) => layer.route.stack)
        .filter((stack) => stack.name === "validateNameLength");

      expect(middleware).toHaveLength(2);
    });

    describe("#validateNameLength()", () => {
      it("should call next('Name length is too short.') if the name is too short", () => {
        const name = "Li";
        const req = { params: { name } };
        const res = {};
        const next = jest.fn();

        validateNameLength(req, res, next);

        expect(next).toHaveBeenCalledWith("Name length is too short.");
        expect(next).toHaveBeenCalledTimes(1);
      });
      it("should call next() if the name is three characters", () => {
        const name = "Dan";
        const req = { params: { name } };
        const res = {};
        const next = jest.fn();

        validateNameLength(req, res, next);
        expect(next).toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Routes", () => {
    describe("/hello/:name", () => {
      it("should respond with a message when given a name of three characters", async () => {
        const response = await request(app).get("/hello/tom");
        expect(response.text).toBe("Hello, tom!");
      });

      it("should return an error for names shorter than three characters", async () => {
        const response = await request(app).get("/hello/li");
        expect(response.text).toBe("Name length is too short.");
      });
    });

    describe("/goodbye/:name", () => {
      it("should respond with a message when given a name of three characters", async () => {
        const response = await request(app).get("/goodbye/ted");
        expect(response.text).toBe("Goodbye, ted.");
      });

      it("should return an error for names shorter than three characters", async () => {
        const response = await request(app).get("/goodbye/li");
        expect(response.text).toBe("Name length is too short.");
      });
    });
  });

  describe("Error Handling", () => {
    describe("Request to unknown route", () => {
      it("should respond with a 404 message", async () => {
        const response = await request(app).get("/unknown");
        expect(response.text).toBe("That route could not be found!");
      });
    });
  });
});
