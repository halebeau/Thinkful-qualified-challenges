const baseURL = process.env.TEST_BASE_URL;

beforeEach(() => {
  // Reset mock function"s states before each test.
  jest.clearAllMocks();
});

const msgs = [];
// Show logs from the page inside labeled container
const onPageConsole = (msg) => {
  console.log(
    `<LOG::page console.${msg.type()}>${msg.text().replace(/\n/g, "<:LF:>")}`
  );
  msgs.push(msg.text());
};

describe("DOM Selectors", () => {
  beforeEach(async () => {
    page.on("console", onPageConsole);
    page.on("pageerror", (err) => console.log(err));
    await page.goto(baseURL, { waitUntil: "load" });
  });

  it("should find a list of elements that are ratings", async () => {
    const ratings = await page.evaluate(() => {
      const r = document.querySelectorAll(".r1");
      const result = [];
      r.forEach((node) => {
        result.push(node.innerText);
      });
      return result;
    });
    expect(ratings.length).toEqual(4);
    expect(ratings[0]).toEqual("4.7");
  });

  it("should find a list of elements with unshaded stars", async () => {
    const stars = await page.evaluate(() => {
      const h = document.querySelectorAll(".h1");
      return h.length;
    });
    expect(stars).not.toBeNull();
    expect(stars).toEqual(4);
  });

  it("should select entire Gateway Arch park element", async () => {
    const gateway = await page.evaluate(() => {
      const h = document.querySelectorAll(".g1");
      if (h.length != 1) {
        return "Incorrect number of elements selected";
      }
      return h.item(0).querySelector("h2").innerText;
    });
    expect(gateway).not.toBeNull();
    expect(gateway).toEqual("Gateway Arch National Park");
  });

  it("should select established date element for Gateway Arch park", async () => {
    const gateway = await page.evaluate(() => {
      const es = document.querySelectorAll(".es1");
      if (es.length != 1) {
        return "Incorrect number of elements selected";
      }
      return es.item(0).innerText;
    });
    expect(gateway).not.toBeNull();
    expect(gateway).toEqual("February 22, 2018");
  });

  it("Correct function used", async () => {
    const errors = await page.evaluate(() => {
      const result = [];
      for (e of document.querySelector("body").classList.values()) {
        result.push(e);
      }
      return result;
    });
    expect(errors.length).toEqual(0);
  });
});
