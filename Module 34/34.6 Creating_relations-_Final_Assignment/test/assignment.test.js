const { Client } = require("pg");
const sqlReader = require("./sqlReader");
const sqlSetup = require("./sqlSetup");

const { USER, DATABASE_URL } = process.env;
const connectionString = DATABASE_URL || (USER
  ? `postgres://localhost/${USER}`
  : "postgres://postgres@localhost/postgres");

const config = { connectionString };

describe("Database Tests", () => {
  it("should connect to a database", async () => {
    const client = new Client(config);
    await client.connect();
    await client.query("LISTEN foo");
    await client.on("notification", async (message) => {
      expect(message.channel).toEqual("foo");
    });
    await client.end();
  });

  describe("CREATE Queries", () => {
    const client = new Client(config);
    beforeAll(async () => {
      await client.connect();
    });
    afterAll(async () => {
      const queryText =
        "drop table if exists authors, books, genres, books_genres;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (error) {
        console.error(error.stack);
      }
    });

    it("should create an authors table with the correct columns", async () => {
      const response = await client.query(sqlSetup("authors"));
      expect(response.command).toEqual("CREATE");

      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'authors';
      `;

      const { rows } = await client.query(queryText);
      const authorNameField = rows.find(
        (row) => row.column_name === "author_name"
      );
      expect(authorNameField).toHaveProperty("udt_name", "varchar");
      expect(authorNameField.character_maximum_length).toEqual(255);

      const nationalityField = rows.find(
        (row) => row.column_name === "nationality"
      );
      expect(nationalityField).toHaveProperty("udt_name", "varchar");
      expect(nationalityField.character_maximum_length).toEqual(255);
    });

    it("should create a books table with the correct columns", async () => {
      const response = await client.query(sqlSetup("books"));
      expect(response.command).toEqual("CREATE");

      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'books';
      `;

      const { rows } = await client.query(queryText);
      const titleField = rows.find((row) => row.column_name === "title");
      expect(titleField).toHaveProperty("udt_name", "varchar");
      expect(titleField.character_maximum_length).toEqual(255);

      const publicationYearField = rows.find(
        (row) => row.column_name === "publication_year"
      );
      expect(publicationYearField).toHaveProperty("data_type", "integer");

      const inStockField = rows.find((row) => row.column_name === "in_stock");
      expect(inStockField).toHaveProperty("data_type", "boolean");

      const authorIdField = rows.find((row) => row.column_name === "author_id");
      expect(authorIdField).toHaveProperty("data_type", "integer");
    });

    it("should create a genres table with the correct columns", async () => {
      const response = await client.query(sqlSetup("genres"));
      expect(response.command).toEqual("CREATE");

      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'genres';
      `;

      const { rows } = await client.query(queryText);
      const genreNameField = rows.find(
        (row) => row.column_name === "genre_name"
      );
      expect(genreNameField).toHaveProperty("udt_name", "varchar");
      expect(genreNameField.character_maximum_length).toEqual(100);
    });

    it("should create a books_genres table with the correct columns", async () => {
      const response = await client.query(sqlSetup("books_genres"));
      expect(response.command).toEqual("CREATE");

      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'books_genres';
      `;

      const { rows } = await client.query(queryText);

      const bookIdField = rows.find((row) => row.column_name === "book_id");
      expect(bookIdField).toHaveProperty("data_type", "integer");

      const genreIdField = rows.find((row) => row.column_name === "genre_id");
      expect(genreIdField).toHaveProperty("data_type", "integer");
    });

    describe("Queries", () => {
      beforeAll(async () => {
        await client.query(sqlSetup("seed"));
      });
      describe("get-all-books-by-author.sql", () => {
        it('should retrieve a list of all book and author-related fields for all books written by "Amy Tan"', async () => {
          const queryText = sqlReader("get-all-books-by-author");
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rowCount).toEqual(6);

          response.rows.forEach((row) => {
            expect(row.author_name).toEqual("Amy Tan");

            expect(row).toHaveProperty("book_id");
            expect(row).toHaveProperty("title");
            expect(row).toHaveProperty("publication_year");
            expect(row).toHaveProperty("in_stock");
            expect(row).not.toHaveProperty("genre_id");
            expect(row).not.toHaveProperty("genre_name");
            expect(row).toHaveProperty("author_id");
            expect(row).toHaveProperty("author_name");
            expect(row).toHaveProperty("nationality");
          });
        });
      });

      describe("get-all-books-not-in-stock.sql", () => {
        it("should retrieve a list of all book and author-related fields for all books that are currently out of stock", async () => {
          const queryText = sqlReader("get-all-books-not-in-stock");
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rowCount).toEqual(18);

          response.rows.forEach((row) => {
            expect(row.in_stock).toBeFalsy();

            expect(row).toHaveProperty("book_id");
            expect(row).toHaveProperty("title");
            expect(row).toHaveProperty("publication_year");
            expect(row).toHaveProperty("in_stock");
            expect(row).not.toHaveProperty("genre_id");
            expect(row).not.toHaveProperty("genre_name");
            expect(row).toHaveProperty("author_id");
            expect(row).toHaveProperty("author_name");
            expect(row).toHaveProperty("nationality");
          });
        });
      });

      describe("get-all-books-by-country.sql", () => {
        it('should retrieve a list of all book and author-related fields for all books written by an author from "China" or "Turkey"', async () => {
          const queryText = sqlReader("get-all-books-by-country");
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rowCount).toEqual(10);

          response.rows.forEach((row) => {
            expect(["China", "Turkey"]).toContain(row.nationality);

            expect(row).toHaveProperty("book_id");
            expect(row).toHaveProperty("title");
            expect(row).toHaveProperty("publication_year");
            expect(row).toHaveProperty("in_stock");
            expect(row).not.toHaveProperty("genre_id");
            expect(row).not.toHaveProperty("genre_name");
            expect(row).toHaveProperty("author_id");
            expect(row).toHaveProperty("author_name");
            expect(row).toHaveProperty("nationality");
          });
        });
      });

      describe("count-books.sql", () => {
        it('should return the number of books "Leo Tolstoy" wrote', async () => {
          const queryText = sqlReader("count-books");
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rows[0].count).toEqual("7");
        });
      });

      describe("count-books-before-year.sql", () => {
        it("should return the number of books written before 2000", async () => {
          const queryText = sqlReader("count-books-before-year");
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rows[0].count).toEqual("33");
        });
      });

      describe("get-all-books-before-year-by-nationality.sql", () => {
        it("should retrieve a list of all book and author-related fields for all books written before 2005 by non-US authors", async () => {
          const queryText = sqlReader(
            "get-all-books-before-year-by-nationality"
          );
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rowCount).toEqual(25);

          response.rows.forEach((row) => {
            expect(row.publication_year).toBeLessThan(2005);
            expect(row.nationality).not.toEqual("United States of America");

            expect(row).toHaveProperty("book_id");
            expect(row).toHaveProperty("title");
            expect(row).toHaveProperty("publication_year");
            expect(row).toHaveProperty("in_stock");
            expect(row).not.toHaveProperty("genre_id");
            expect(row).not.toHaveProperty("genre_name");
            expect(row).toHaveProperty("author_id");
            expect(row).toHaveProperty("author_name");
            expect(row).toHaveProperty("nationality");
          });
        });
      });

      describe("get-all-authors-by-title-length.sql", () => {
        it("should retrieve a list of all authors who have written books whose titles are longer than 25 characters", async () => {
          const queryText = sqlReader("get-all-authors-by-title-length");
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rowCount).toEqual(8);

          response.rows.forEach((row) => {
            expect(row.title.length).toBeGreaterThan(25);

            expect(row).toHaveProperty("book_id");
            expect(row).toHaveProperty("title");
            expect(row).toHaveProperty("publication_year");
            expect(row).toHaveProperty("in_stock");
            expect(row).not.toHaveProperty("genre_id");
            expect(row).not.toHaveProperty("genre_name");
            expect(row).toHaveProperty("author_id");
            expect(row).toHaveProperty("author_name");
            expect(row).toHaveProperty("nationality");
          });
        });
      });

      describe("get-all-books-by-author-by-genre.sql", () => {
        it('should retrieve a list of all book and author-related fields for all books written by "Leo Tolstoy" that belong to either the "autobiography" or "history" genres', async () => {
          const queryText = sqlReader("get-all-books-by-author-by-genre");
          const response = await client.query(queryText);

          expect(response.command).toEqual("SELECT");
          expect(response.rowCount).toEqual(6);

          response.rows.forEach((row) => {
            expect(row.author_name).toEqual("Leo Tolstoy");
            expect(["autobiography", "history"]).toContain(row.genre_name);

            expect(row).toHaveProperty("book_id");
            expect(row).toHaveProperty("title");
            expect(row).toHaveProperty("publication_year");
            expect(row).toHaveProperty("in_stock");
            expect(row).toHaveProperty("author_id");
            expect(row).toHaveProperty("genre_id");
            expect(row).toHaveProperty("genre_name");
            expect(row).toHaveProperty("author_name");
            expect(row).toHaveProperty("nationality");
          });
        });
      });
    });
  });
});
