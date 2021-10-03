const baseURL = process.env.TEST_BASE_URL;

beforeEach(async () => {
  // Reset mock function"s states before each test.
  jest.clearAllMocks();
  page.on("console", onPageConsole);
  await page.goto(baseURL, { waitUntil: "load" });
});

// Show logs from the page inside labeled container
const onPageConsole = (msg) => {
  console.log(
    `<LOG::page console.${msg.type()}>${msg.text().replace(/\n/g, "<:LF:>")}`
  );
};

describe("Form Submission", () => {
  describe("when the page loads", () => {
    it("should have an element with the class '.articles'", async () => {
      const articleElem = await page.evaluate(() =>
        document.querySelector(".articles")
      );
      expect(articleElem).not.toBeNull();
    });

    it("should not have an element with the id '#searchError'", async () => {
      const errorElem = await page.evaluate(() =>
        document.querySelector("#searchError")
      );
      expect(errorElem).toBeNull();
    });

    it("should not have an element with the class '.error'", async () => {
      const errorElem = await page.evaluate(() =>
        document.querySelector(".error")
      );
      expect(errorElem).toBeNull();
    });

    it("should have an element with the id '#searchForm'", async () => {
      const formElem = await page.evaluate(() =>
        document.querySelector("#searchForm")
      );
      expect(formElem).not.toBeNull();
    });
  });

  describe("when the form is left blank", () => {
    beforeEach(async () => {
      await page.waitForSelector("#searchBtn");
      const btnElem = await page.$("#searchBtn");
      expect(btnElem).not.toBeNull();
      await btnElem.click();
    });
    it("should display error with id '#searchError'", async () => {
      const errorElem = await page.$("#searchError");
      expect(errorElem).not.toBeNull();
      const value = await page.evaluate((el) => el.textContent, errorElem);
      expect(value).toEqual("Please enter a search term");
    });

    it("should display error with class '.error'", async () => {
      const errorClassElem = await page.$(".error");
      expect(errorClassElem).not.toBeNull();
    });

    it("should display error message with text 'Please enter a search term'", async () => {
      const errorElem = await page.$("#searchError");
      expect(errorElem).not.toBeNull();
      const value = await page.evaluate((el) => el.textContent, errorElem);
      expect(value).toEqual("Please enter a search term");
    });
  });

  describe("when form contains only whitespace", () => {
    beforeEach(async () => {
      await page.waitForSelector("#searchBtn");
      const btnElem = await page.$("#searchBtn");
      expect(btnElem).not.toBeNull();
      await page.type("#searchTerm", "   ");
      await btnElem.click();
    });

    it("should display error with id '#searchError'", async () => {
      const errorElem = await page.$("#searchError");
      expect(errorElem).not.toBeNull();
      const value = await page.evaluate((el) => el.textContent, errorElem);
      expect(value).toEqual("Please enter a search term");
    });

    it("should display error with class '.error'", async () => {
      const errorClassElem = await page.$(".error");
      expect(errorClassElem).not.toBeNull();
    });

    it("should display error message with text 'Please enter a search term'", async () => {
      const errorElem = await page.$("#searchError");
      expect(errorElem).not.toBeNull();
      const value = await page.evaluate((el) => el.textContent, errorElem);
      expect(value).toEqual("Please enter a search term");
    });
  });

  describe("Search Function", () => {
    describe("when the search term is not found", () => {
      beforeEach(async () => {
        await page.waitForSelector("#searchBtn");
        const btnElem = await page.$("#searchBtn");
        expect(btnElem).not.toBeNull();
        await page.type("#searchTerm", "gumdrop");
        await btnElem.click();
      });

      it("should not display an error message", async () => {
        const errorElem = await page.evaluate(() =>
          document.querySelector(".error")
        );
        expect(errorElem).toBeNull();
        const errorId = await page.evaluate(() =>
          document.querySelector("#searchError")
        );
        expect(errorId).toBeNull();
      });

      it("should display no articles", async () => {
        const hiddenArticles = await page.evaluate(
          () => document.querySelectorAll(".hidden").length
        );
        expect(hiddenArticles).toEqual(8);
      });
    });

    describe("when the search term is found", () => {
      beforeEach(async () => {
        await page.waitForSelector("#searchBtn");
        const btnElem = await page.$("#searchBtn");
        expect(btnElem).not.toBeNull();
        await page.type("#searchTerm", "Art");
        await btnElem.click();
      });

      it("should not display an error message", async () => {
        const errorElem = await page.evaluate(() =>
          document.querySelector(".error")
        );
        expect(errorElem).toBeNull();
        const errorId = await page.evaluate(() =>
          document.querySelector("#searchError")
        );
        expect(errorId).toBeNull();
      });

      it("should hide articles not partially containing the search term", async () => {
        const hiddenArticles = await page.evaluate(
          () => document.querySelectorAll(".hidden").length
        );
        expect(hiddenArticles).toEqual(4);
      });

      it("should display articles partially containing the search term", async () => {
        const hiddenArticles = await page.evaluate(
          () => document.querySelectorAll("article:not(.hidden)").length
        );
        expect(hiddenArticles).toEqual(4);
      });
    });

    describe("when the search term case is different", () => {
      beforeEach(async () => {
        await page.waitForSelector("#searchBtn");
        const btnElem = await page.$("#searchBtn");
        expect(btnElem).not.toBeNull();
        await page.type("#searchTerm", "art");
        await btnElem.click();
      });

      it("should not display an error message", async () => {
        const errorElem = await page.evaluate(() =>
          document.querySelector(".error")
        );
        expect(errorElem).toBeNull();
        const errorId = await page.evaluate(() =>
          document.querySelector("#searchError")
        );
        expect(errorId).toBeNull();
      });

      it("should hide articles not partially containing the search term", async () => {
        const hiddenArticles = await page.evaluate(
          () => document.querySelectorAll(".hidden").length
        );
        expect(hiddenArticles).toEqual(4);
      });

      it("should display articles partially containing the search term", async () => {
        const hiddenArticles = await page.evaluate(
          () => document.querySelectorAll("article:not(.hidden)").length
        );
        expect(hiddenArticles).toEqual(4);
      });
    });
  });
});
