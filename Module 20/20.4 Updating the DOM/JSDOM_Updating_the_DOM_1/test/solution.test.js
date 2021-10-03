const baseURL = process.env.TEST_BASE_URL;

beforeEach(() => {
  // Reset mock function's states before each test.
  jest.clearAllMocks();
});

// Show logs from the page inside labeled container
const onPageConsole = (msg) => {
  console.log(
    `<LOG::page console.${msg.type()}>${msg.text().replace(/\n/g, "<:LF:>")}`
  );
};

describe("Updating the DOM", () => {
  beforeEach(async () => {
    page.on("console", onPageConsole);
    await page.goto(baseURL, { waitUntil: "load" });
  });

  // basic example of how to test for content on page
  it("should have 8 article elements", async () => {
    const count = await page.evaluate(
      () => document.querySelectorAll("article").length
    );
    expect(count).toEqual(8);
  });

  it("should have 8 h2 headings in 8 article elements", async () => {
    const count = await page.evaluate(
      () => document.querySelectorAll("article h2").length
    );
    expect(count).toEqual(8);
  });

  it("should have 5 elements with article class", async () => {
    const count = await page.evaluate(
      () => document.querySelectorAll(".article").length
    );
    expect(count).toEqual(5);
  });

  it("should have 3 elements with tutorial class", async () => {
    const count = await page.evaluate(
      () => document.querySelectorAll(".tutorial").length
    );
    expect(count).toEqual(3);
  });

  it("should have 5 elements in the article  section", async () => {
    const count = await page.evaluate(
      () => document.querySelectorAll(".articles article").length
    );
    expect(count).toEqual(5);
  });

  it("should have 3 elements in the tutorials section", async () => {
    const count = await page.evaluate(
      () => document.querySelectorAll(".tutorials article").length
    );
    expect(count).toEqual(3);
  });
});
