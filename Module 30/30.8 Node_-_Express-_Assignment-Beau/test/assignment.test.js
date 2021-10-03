const fs = require("fs");
const path = require("path");
const request = require("supertest");

const app = require("../src/app");

describe("Application Routes", () => {
  describe("File Requirements", () => {
    it("should have an app.js file in the src/ directory", () => {
      const appPath = path.join(__dirname, "..", "src", "app.js");
      const content = fs.existsSync(appPath);
      expect(content).toBe(true);
    });

    it("should have a server.js file in the src/ directory", () => {
      const serverPath = path.join(__dirname, "..", "src", "server.js");
      const content = fs.existsSync(serverPath);
      expect(content).toBe(true);
    });

    it("should run the server (use app.listen) in the server.js file", () => {
      const serverPath = path.join(__dirname, "..", "src", "server.js");
      const content = fs.readFileSync(serverPath, "utf-8");
      expect(content).toContain(".listen");
    });
  });

  describe("Middleware Requirements", () => {
    const middleware = app._router.stack;

    it("should use validateZip as middleware", () => {
      const middleware = app._router.stack
        .filter((layer) => layer.route)
        .flatMap((layer) => layer.route.stack)
        .filter((stack) => stack.name === "validateZip");

      expect(middleware).toHaveLength(2);
    });
  });

  describe("Route Not Found", () => {
    it("should return an error for non-existent routes", async () => {
      const response = await request(app).get("/failure");
      expect(response.text).toBe("That route could not be found!");
    });
  });

  describe("Routes", () => {
    describe("/check/:zip", () => {
      describe("valid request", () => {
        it("will respond with a short message saying the zip exists", async () => {
          const zip = "34117";
          const response = await request(app).get(`/check/${zip}`);
          expect(response.text).toBe(`${zip} exists in our records.`);
        });
      });

      describe("invalid request", () => {
        it("will respond with a short message if the zip is valid but does not exist", async () => {
          const zip = "07503";
          const response = await request(app).get(`/check/${zip}`);
          expect(response.text).toBe(`${zip} does not exist in our records.`);
        });

        it("will respond with a the standard zip error message if the zip is wrong length", async () => {
          const zip = "7502";
          const response = await request(app).get(`/check/${zip}`);
          expect(response.text).toBe(`Zip (${zip}) is invalid!`);
        });

        it("will respond with a the standard zip error message if the zip is not a number", async () => {
          const zip = "ABCDE";
          const response = await request(app).get(`/check/${zip}`);
          expect(response.text).toBe(`Zip (${zip}) is invalid!`);
        });
      });
    });

    describe("/zoos/:zip", () => {
      describe("valid request", () => {
        it("can respond with a single zoo", async () => {
          const zip = "02121";
          const response = await request(app).get(`/zoos/${zip}`);
          const zoos =
            "COMMONWEALTH ZOOLOGICAL CORPORATION, Boston, Massachusetts";
          expect(response.text).toBe(`${zip} zoos: ${zoos}`);
        });

        it("can respond with multiple zoos separated by a semicolon", async () => {
          const zip = "33890";
          const response = await request(app).get(`/zoos/${zip}`);
          const names =
            "HARDEE COUNTY BOARD OF COUNTY COMMISSION, Zolfo Springs, Florida; PEACE RIVER REFUGE & RANCH INC, Zolfo Springs, Florida";
          expect(response.text).toBe(`${zip} zoos: ${names}`);
        });

        it("can respond when there are no zoos", async () => {
          const zip = "07502";
          const response = await request(app).get(`/zoos/${zip}`);
          expect(response.text).toBe(`${zip} has no zoos.`);
        });
      });

      describe("invalid request", () => {
        it("should respond with an error message if the zip is wrong length", async () => {
          const zip = "12345678";
          const response = await request(app).get(`/zoos/${zip}`);
          expect(response.text).toBe(`Zip (${zip}) is invalid!`);
        });

        it("should respond with an error message if the zip is not numeric", async () => {
          const zip = "ABCDE";
          const response = await request(app).get(`/zoos/${zip}`);
          expect(response.text).toBe(`Zip (${zip}) is invalid!`);
        });
      });
    });

    describe("/zoos/all", () => {
      it("should respond with an error message by default", async () => {
        const response = await request(app).get("/zoos/all");
        expect(response.text).toBe("You do not have access to that route.");
      });

      it('if a query param of "admin" is provided with an invalid value, return the error message', async () => {
        const response = await request(app).get("/zoos/all?admin=t");
        expect(response.text).toBe("You do not have access to that route.");
      });

      it('if a query param of "admin" is provided with a value of "true", respond with admin messages', async () => {
        const response = await request(app).get("/zoos/all?admin=true");
        const names =
          "WILDLIFE CONSERVATION SOCIETY, Bronx, New York; HARDEE COUNTY BOARD OF COUNTY COMMISSION, Zolfo Springs, Florida; PEACE RIVER REFUGE & RANCH INC, Zolfo Springs, Florida; CLOSE UP CREATURES L L C, Naples, Florida; KOWIACHOBEE ANIMAL PRESERVE INC, Naples, Florida; PRIVATE OWNER, Naples, Florida; COMMONWEALTH ZOOLOGICAL CORPORATION, Boston, Massachusetts";
        expect(response.text).toBe(`All zoos: ${names}`);
      });
    });
  });
});
