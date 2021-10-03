const request = require("supertest");
const states = require("../src/data/states-data");
const users = require("../src/data/users-data");

const app = require("../src/app");

describe("App", () => {
  beforeEach(() => {
    users.splice(0, users.length);
    Object.keys(states).forEach((stateCode) => delete states[stateCode]);
  });

  test("returns error for non-existent url", async () => {
    const expected = "Not found: /vcuefkvuex/dijiymkfcw";

    const response = await request(app)
      .get("/vcuefkvuex/dijiymkfcw")
      .set("Accept", "application/json");

    expect(response.text).toEqual(expected);
  });

  describe("path /users", () => {
    test("returns list of users", async () => {
      const expected = {
        data: [
          {
            id: 39,
            first_name: "Anaïs",
            last_name: "McCaghan",
            email: "imccaghan12@exblog.jp",
          },
          {
            id: 40,
            first_name: "Bérangère",
            last_name: "Poundford",
            email: "apoundford13@acquirethisname.com",
          },
        ],
      };

      expected.data.forEach((user) => users.push(user));

      const response = await request(app)
        .get("/users")
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    });
  });

  describe("path /users/:userId", () => {
    test("returns existing user", async () => {
      const expected = {
        data: {
          id: 41,
          first_name: "Publicité",
          last_name: "Reckhouse",
          email: "creckhouse14@tamu.edu",
        },
      };

      users.push(expected.data);

      const response = await request(app)
        .get("/users/41")
        .set("Accept", "application/json");

      expect(response.body).toEqual(expected);
      expect(response.status).toBe(200);
    });

    test("returns error for non-existent user id", async () => {
      const expected = "User ID not found: 42";

      const response = await request(app)
        .get("/users/42")
        .set("Accept", "application/json");

      expect(response.text).toEqual(expected);
    });
  });

  describe("path /states", () => {
    test("returns all states", async () => {
      states.AL = "Alabama";
      states.CT = "Connecticut";
      states.DC = "District of Columbia";

      const expected = {
        data: { ...states },
      };

      const response = await request(app)
        .get("/states")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    });
  });
  describe("path /states/:stateCode", () => {
    test("returns state for the specified stateCode", async () => {
      const expected = {
        data: {
          stateCode: "FL",
          name: "Florida",
        },
      };

      states.FL = "Florida";

      const response = await request(app)
        .get("/states/FL")
        .set("Accept", "application/json");

      expect(response.body).toEqual(expected);
      expect(response.status).toBe(200);
    });

    test("returns error for non-existent id", async () => {
      const expected = "State code not found: AL";

      const response = await request(app)
        .get("/states/AL")
        .set("Accept", "application/json");

      expect(response.text).toEqual(expected);
    });
  });

  describe("error handler", () => {
    it("should respond with 500 if there is an error", async () => {
      const middleware = app._router.stack;
      app._router.stack = [];
      app.use("/makeError", (req, res, next) => {
        next("OH NO!");
      });
      app._router.stack = [...app._router.stack, ...middleware];

      const response = await request(app).get("/makeError");

      expect(response.status).toBe(500);
    });

    it("custom error handler created", async () => {
      const middleware = app._router.stack.map((layer) =>
        layer.handle.toString()
      );
      const exists = middleware.find((func) => {
        let lp = func.indexOf("(");
        if (lp === -1) {
          return false;
        }
        let rp = func.indexOf(")");
        if (rp === -1 || rp < lp) {
          return false;
        }
        const args = func.slice(lp + 1, rp).split(",").length === 4;
        return args;
      });

      expect(exists).toBeDefined();
    });
  });
});
