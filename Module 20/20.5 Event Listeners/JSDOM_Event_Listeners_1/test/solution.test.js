const baseURL = process.env.TEST_BASE_URL;

beforeEach(async () => {
  // Reset mock function's states before each test.
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

describe("Index Page", () => {
  it("should have 8 articles", async () => {
    const number = await page.evaluate(
      () => document.querySelectorAll(".article").length
    );
    expect(number).toEqual(8);
  });

  it("should have 8 expand buttons", async () => {
    const number = await page.evaluate(
      () => document.querySelectorAll(".expand_button").length
    );
    expect(number).toEqual(8);
  });

  it("should have 8 highlight buttons", async () => {
    const number = await page.evaluate(
      () => document.querySelectorAll(".highlightBtn").length
    );
    expect(number).toEqual(8);
  });
});

describe("expandArticleBody()", () => {
  it("should be able to expand an article", async () => {
    await page.click(".expand_button");
    const count = await page.evaluate(() => {
      const bodies = document.querySelectorAll(".article_body");
      let count = 0;
      for (let body of bodies) {
        if (body.style.display === "block") {
          count++;
        }
      }
      return count;
    });
    expect(count).toEqual(1);
  });

  it("should expand the right article", async () => {
    await page.click(".expand_button");
    const display = await page.evaluate(
      () => document.querySelector(".article_body").style.display
    );

    expect(display).toEqual("block");
  });

  it("should change symbol on button", async () => {
    await page.click(".expand_button");
    const display = await page.evaluate(
      () => document.querySelector(".expand_button").innerText
    );

    expect(display).toEqual("V");
  });

  it("should change symbol back on second click of button", async () => {
    await page.click(".expand_button");
    await page.click(".expand_button");
    const display = await page.evaluate(
      () => document.querySelector(".expand_button").innerText
    );

    expect(display).toEqual(">");
  });
});

describe("highlightArticle()", () => {
  it("should be able to highlight a single article", async () => {
    await page.click(".expand_button");
    await page.click(".highlightBtn");
    const count = await page.evaluate(
      () => document.querySelectorAll(".highlight").length
    );
    expect(count).toEqual(1);
  });

  it("should unhighlight on second click", async () => {
    await page.click(".expand_button");
    await page.click(".highlightBtn");
    await page.click(".highlightBtn");
    const count = await page.evaluate(
      () => document.querySelectorAll(".highlight").length
    );
    expect(count).toEqual(0);
  });

  it("should change symbol on button", async () => {
    await page.click(".expand_button");
    await page.click(".highlightBtn");
    const display = await page.evaluate(
      () => document.querySelector(".highlightBtn").innerText
    );

    expect(display).toEqual("-");
  });

  it("should change symbol back on second click of button", async () => {
    await page.click(".expand_button");
    await page.click(".highlightBtn");
    await page.click(".highlightBtn");
    const display = await page.evaluate(
      () => document.querySelector(".highlightBtn").innerText
    );

    expect(display).toEqual("+");
  });
});
