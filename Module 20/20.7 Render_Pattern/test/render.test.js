const baseURL = process.env.TEST_BASE_URL;

beforeEach(() => {
  // Reset mock function"s states before each test.
  jest.clearAllMocks();
});

// Show logs from the page inside labeled container
const onPageConsole = (msg) => {
  console.log(
    `<LOG::page console.${msg.type()}>${msg.text().replace(/\n/g, "<:LF:>")}`
  );
};

describe("Render Pattern", () => {
  beforeEach(async () => {
      page.on("console", onPageConsole);
    await page.goto(baseURL, { waitUntil: "load" });
  });

  describe("when the page loads", () => {
    it("should have an element with the id '#cart'", async () => {
      const cart = await page.evaluate(() => document.querySelector("#cart"));
      expect(cart).not.toBeNull();
    });

    it("should not have a button with id '#sortBtn'", async () => {
      const sortBtn = await page.evaluate(() =>
        document.querySelector("#sortBtn")
      );
      expect(sortBtn).not.toBeNull();
    });

    it("should have a section with the id '#cartItems'", async () => {
      const cartItems = await page.evaluate(() =>
        document.querySelector("#cartItems")
      );
      expect(cartItems).not.toBeNull();
    });

    it("should have an element with the id '#cartTotal'", async () => {
      const total = await page.evaluate(() =>
        document.querySelector("#cartTotal")
      );
      expect(total).not.toBeNull();
    });
  });

  describe("initial page render", () => {
    it("should create a div with class '.book'", async () => {
      const book = await page.$(".book");
      expect(book).not.toBeNull();
      const value = await page.evaluate((el) => el.textContent, book);
      expect(value).toMatch("PROLOG Programming for Artificial Intelligence");
    });

    it("should load 5 books", async () => {
      const books = await page.$$(".book");
      const length = books.length;
      expect(length).toEqual(5);
    });

    it("each book should contain a title", async () => {
      const book = await page.$(".book");
      expect(book).not.toBeNull();
      const title = book.$(".title");
      expect(title).not.toBeNull();
    });

    it("each book should contain a rating", async () => {
      const book = await page.$(".book");
      expect(book).not.toBeNull();
      const rating = book.$(".rating");
      expect(rating).not.toBeNull();
    });

    it("each book should contain authors", async () => {
      const book = await page.$(".book");
      expect(book).not.toBeNull();
      const authors = book.$(".authors");
      expect(authors).not.toBeNull();
    });

    it("each book should contain a delete button", async () => {
      const book = await page.$(".book");
      expect(book).not.toBeNull();
      const btn = book.$(".removeBtn");
      expect(btn).not.toBeNull();
    });

    it("each book should contain a quantity", async () => {
      const book = await page.$(".book");
      expect(book).not.toBeNull();
      const quantity = book.$(".quantity");
      expect(quantity).not.toBeNull();
    });

    it("each book should contain a price", async () => {
      const book = await page.$(".book");
      expect(book).not.toBeNull();
      const price = book.$(".price");
      expect(price).not.toBeNull();
    });
  });

  describe("The render function", () => {
    describe("when cart is empty", () => {
      it("should display 'nothing in cart'", async () => {
        const value = await page.evaluate((el) => {
          window.books = [];
          window.render();
          return document.querySelector("#cartItems").innerText;
        });
        expect(value).toEqual("Nothing in cart");
      });

      it("should display a total of 0", async () => {
        const value = await page.evaluate((el) => {
          window.books = [];
          window.render();
          return document.querySelector(".total-price").innerText;
        });
        expect(value).toEqual("$0");
      });
    });

    describe("when cart is not empty", () => {
      it("should display all items in cart", async () => {
        const length = await page.evaluate(
          () => document.querySelectorAll("#cartItems .book").length
        );
        expect(length).toEqual(5);
      });

      it("should display total price of items in cart", async () => {
        const value = await page.evaluate(() => {
          window.books = window.books.map((book) => ({
            ...book,
            quantity: 2,
            price: 10,
          }));
          window.render();
          return document.querySelector(".total-price").innerHTML;
        });

        expect(value).toEqual("$100");
      });
    });
  });

  describe("calculateTotal", () => {
    it("should return 0 when cart is empty", async () => {
      const value = await page.evaluate(() => {
        window.books = [];
        return window.calculateTotal();
      });

      expect(value).toEqual(0);
    });

    it("should sum prices of single items", async () => {
      const value = await page.evaluate(() => {
        window.books = window.books.map((book) => ({
          ...book,
          quantity: 1,
          price: 10,
        }));
        return window.calculateTotal();
      });

      expect(value).toEqual(50);
    });

    it("should sum price * quanity for multiple items", async () => {
      const value = await page.evaluate(() => {
        window.books = window.books.map((book) => ({
          ...book,
          quantity: 2,
          price: 10,
        }));
        return window.calculateTotal();
      });

      expect(value).toEqual(100);
    });
  });

  describe("sortByPrice()", () => {
    it("should return [] when cart is empty", async () => {
      const books = await page.evaluate(() => {
        window.books = [];
        window.sortByPrice();
        return window.books.map((book) => book.price);
      });
      expect(books).toEqual([]);
    });

    it("should sort books in ascending order of price", async () => {
      const sortedPrices = await page.evaluate(() => {
        return window.books.map((book) => book.price).sort((a, b) => a - b);
      });

      const books = await page.evaluate(() => {
        window.sortByPrice();
        return window.books.map((book) => book.price);
      });

      expect(books).toEqual(sortedPrices);
    });

    it("should render the sorted array", async () => {
      const sortedTitles = await page.evaluate(() => {
        return [...window.books]
          .sort((a, b) => a.price - b.price)
          .map((book) => book.title);
      });

      const titles = await page.evaluate(() => {
        window.sortByPrice();
        titles = [];
        document
          .querySelectorAll("#cartItems .book .title")
          .forEach((title) => {
            titles.push(title.innerHTML);
          });
        return titles;
      });

      expect(titles.every((title, i) => title.includes(sortedTitles[i]))).toBe(
        true
      );
    });

    it("should be able to click the sort button", async () => {
      const sortedPrices = await page.evaluate(() => {
        return window.books.map((book) => book.price).sort((a, b) => a - b);
      });

      await page.click("#sortBtn");

      const pricesAfterClick = await page.evaluate(() => {
        return window.books.map((book) => book.price);
      });

      expect(pricesAfterClick).toEqual(sortedPrices);
    });
  });
});
