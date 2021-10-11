const fs = require("fs");
const path = require("path");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { getSlogan, fullSession } = require(process.env.SOLUTION_PATH
  ? "../solution/src/main"
  : "../src/main");

chai.should();
chai.use(require("sinon-chai"));

const wait = ms =>
  new Promise((resolve, reject) => setTimeout(() => resolve(true), ms));

describe("Assignment (Solution)", () => {
  beforeEach(() => sinon.spy(console, "log"));
  afterEach(() => console.log.restore());

  describe("#getSlogan()", () => {
    it("should print the request and slogan", async () => {
      const question = "Can I have a slogan for my new startup?";
      await getSlogan(question);
      await wait(250);
      expect(console.log).to.have.been.called;

      const firstCall = console.log.getCall(0).args[0];
      expect(firstCall).to.include(`Your request was: ${question}`);

      const secondCall = console.log.getCall(1).args[0];
      expect(secondCall).to.include(`Your slogan is:`);
    });
  });

  describe("#fullSession()", () => {
    it("should print the welcome message", async () => {
      const question = "Can I have a slogan for my new startup?";
      await fullSession(question);
      await wait(250);
      expect(console.log).to.have.been.called;

      const call = console.log.getCall(0).args[0];
      expect(call).to.include("Ask me for a random slogan...");
    });

    it("should reprint the question", async () => {
      const question = "Can I have a slogan for my new startup?";
      await fullSession(question);
      await wait(250);
      expect(console.log).to.have.been.called;

      const call = console.log.getCall(1).args[0];
      expect(call).to.include(`Your request was: ${question}`);
    });

    it("should print the slogan", async () => {
      const question = "Can I have a slogan for my new startup?";
      await fullSession(question);
      await wait(250);
      expect(console.log).to.have.been.called;

      const call = console.log.getCall(2).args[0];
      expect(call).to.include(`Your slogan is:`);
    });

    it("should say goodbye", async () => {
      const question = "Can I have a slogan for my new startup?";
      await fullSession(question);
      await wait(250);
      expect(console.log).to.have.been.called;

      const call = console.log.getCall(3).args[0];
      expect(call).to.include("Best of luck on your startup...");
    });
  });

  describe("Implementation", () => {
    const filePath = path.join(
      __dirname,
      "..",
      process.env.SOLUTION_PATH ? "solution" : "",
      "src",
      "main.js"
    );
    const contents = fs.readFileSync(filePath, "utf-8");
    it("should define functions using `async`", () => {
      expect(contents).to.include("async");

      const count = contents.split("async").length - 1;
      expect(count).to.equal(2);
    });

    it("should use `await` multiple times to evaluate promises", () => {
      expect(contents).to.include("await");

      const count = contents.split("await").length - 1;
      expect(count).to.be.above(3);
    });
    
    it("should not use .then() or .catch()", () => {
      expect(contents).to.not.include(".then");
      expect(contents).to.not.include(".catch");
    })
  });
});
