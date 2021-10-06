const { Client } = require("pg");

const { USER, DATABASE_URL } = process.env;
const connectionString =
  DATABASE_URL ||
  (USER
    ? `postgres://localhost/${USER}`
    : "postgres://postgres@localhost/postgres");

const config = { connectionString };

const sqlReader = require("./sqlReader");
const sqlSetup = require("./sqlSetup");

describe("Database Tests", () => {
  it("should connect to a database", async () => {
    const client = new Client(config);
    const response = await client.connect();
    await client.end();
    expect(response).toBeTruthy;
  });

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

    describe("insert-artist.sql", () => {
      it("should create a new artist", async () => {
        const queryText = sqlReader("artists", "insert-artist");
        const response = await client.query(queryText);

        expect(response.command).toEqual("INSERT");
        expect(response.rowCount).toEqual(1);
      });

      it("should do so with the appropriate information", async () => {
        const queryText = `
          SELECT * FROM artists;
        `;
        const response = await client.query(queryText);
        const [row] = response.rows;

        expect(row.first_name).toEqual("Kehinde");
        expect(row.last_name).toEqual("Wiley");
        expect(row.birthday).toBeTruthy();
        expect(row.is_alive).toBeTruthy();
      });
    });

    describe("insert-multiple-artists.sql", () => {
      it("should create three new artists", async () => {
        const queryText = sqlReader("artists", "insert-multiple-artists");
        const response = await client.query(queryText);

        expect(response.command).toEqual("INSERT");
        expect(response.rowCount).toEqual(3);
      });

      it("each artist should have all their fields", async () => {
        const queryText = `
          SELECT * FROM artists;
        `;
        const { rows } = await client.query(queryText);

        expect(rows.length).toBeGreaterThan(1);
        rows.forEach((row) => {
          expect(row).toHaveProperty("first_name");
          expect(row).toHaveProperty("last_name");
          expect(row).toHaveProperty("birthday");
          expect(row).toHaveProperty("is_alive");
        });
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

    describe("insert-artwork.sql", () => {
      it("should insert a piece of art with incomplete information", async () => {
        const queryText = sqlReader("artworks", "insert-artwork");
        const response = await client.query(queryText);

        expect(response.command).toEqual("INSERT");
        expect(response.rowCount).toEqual(1);
      });

      it("should contain a name and medium", async () => {
        const queryText = `
          SELECT * FROM artworks;
        `;
        const response = await client.query(queryText);
        const [row] = response.rows;

        expect(row.name).toEqual("Algorna Study II");
        expect(row.medium).toEqual("oil on paper");
        expect(row.description).toBeFalsy();
      });
    });
  });
});
