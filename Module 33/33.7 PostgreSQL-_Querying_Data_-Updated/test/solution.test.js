const { Client } = require("pg");

const { USER, DATABASE_URL } = process.env;
const connectionString = DATABASE_URL || (USER
  ? `postgres://localhost/${USER}`
  : "postgres://postgres@localhost/postgres");

const config = { connectionString };

const sqlReader = require("./sqlReader");
const sqlSetup = require("./sqlSetup");

describe("Database Tests", () => {
  describe("Artists", () => {
    const client = new Client(config);
    beforeAll(async () => {
      await client.connect();
      const queryText = sqlSetup("artists");
      await client.query(queryText);
    });
    afterAll(async () => {
      const queryText = "DROP TABLE IF EXISTS artists;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    describe("get-all-artists.sql", () => {
      it("should retrieve all artists", async () => {
        const queryText = sqlReader("artists", "get-all-artists");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(4);
      });
    });

    describe("get-artist-names.sql", () => {
      it("should retrieve only the first_name and last_name fields for all artists", async () => {
        const queryText = sqlReader("artists", "get-artist-names");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(4);

        const hasRightKeys = response.rows.every((row) => {
          return (
            Object.keys(row).length === 2 && row.first_name && row.last_name
          );
        });
        expect(hasRightKeys).toBeTruthy();
      });
    });

    describe("get-alive-artists.sql", () => {
      it("should retrieve all artists who are alive", async () => {
        const queryText = sqlReader("artists", "get-alive-artists");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(2);

        const allAlive = response.rows.every((row) => row.is_alive);
        expect(allAlive).toBeTruthy();
      });
    });
    
    describe("get-b-artists.sql", () => {
      it("should retrieve all artists whose last name begins with the letter B", async () => {
        const queryText = sqlReader("artists", "get-b-artists");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(2);

        const result = response.rows.every((row) => row.last_name[0].toLowerCase() === "b");
        expect(result).toBeTruthy();
      });
    });
  });

  describe("Artworks", () => {
    const client = new Client(config);
    beforeAll(async () => {
      await client.connect();
      const queryText = sqlSetup("artworks");
      await client.query(queryText);
    });
    afterAll(async () => {
      const queryText = "DROP TABLE IF EXISTS artworks;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    describe("get-all-artworks.sql", () => {
      it("should retrieve all artworks", async () => {
        const queryText = sqlReader("artworks", "get-all-artworks");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(2);
      });
    });

    describe("get-artwork-descriptions.sql", () => {
      it("should retrieve only the description field for all artworks", async () => {
        const queryText = sqlReader("artworks", "get-artwork-descriptions");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(2);

        const hasRightKeys = response.rows.every((row) => {
          return Object.keys(row).length === 1 && row.description;
        });
        expect(hasRightKeys).toBeTruthy();
      });
    });

    describe("get-the-horse-fair.sql", () => {
      it("should retrieve all fields for the artwork with the name 'The Horse Fair'.", async () => {
        const queryText = sqlReader("artworks", "get-the-horse-fair");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(1);

        const [row] = response.rows;
        expect(row.name).toEqual("The Horse Fair");
        expect(row.medium).toEqual("oil on canvas");
      });
    });
    
    describe("get-artworks-count.sql", () => {
      it("should retrieve a count of all rows in the artworks table.", async () => {
        const queryText = sqlReader("artworks", "get-artworks-count");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rows[0].count).toEqual("2");
      });
    });
  });
});
