const { Client } = require("pg");

const { USER, DATABASE_URL } = process.env;
const connectionString = DATABASE_URL || (USER
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

  describe("Artworks", () => {
    let client;
    beforeEach(async () => {
      client = new Client(config);
      await client.connect();
      const queryText = sqlSetup("artworks");
      await client.query(queryText);
    });
    afterEach(async () => {
      const queryText = "DROP TABLE IF EXISTS artworks;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    describe("update-all-completion-dates.sql", () => {
      it("should update all of the completion dates to 'August 1882'", async () => {
        const queryText = sqlReader("update-all-completion-dates");
        const response = await client.query(queryText);

        expect(response.command).toEqual("UPDATE");
        expect(response.rowCount).toEqual(10);

        const select = `SELECT * FROM artworks`;
        const result = await client.query(select);
        const completeDateMatches = result.rows.every((row) => {
          return row.completion_date === "August 1882";
        });
        expect(completeDateMatches).toBeTruthy();
      });
    });

    describe("update-painting-completion-date.sql", () => {
      it("should update the date of the specified painting", async () => {
        const queryText = sqlReader("update-painting-completion-date");
        const response = await client.query(queryText);

        expect(response.command).toEqual("UPDATE");
        expect(response.rowCount).toEqual(1);

        const title = "Still Life with Cabbage and Clogs";
        const select = `SELECT * FROM artworks;`;
        const { rows } = await client.query(select);
        const paintings = rows.filter(
          (row) => row.completion_date === "July 1881"
        );
        expect(paintings.length).toEqual(1);
        expect(paintings[0].title).toEqual(title);
      });
    });

    describe("update-painting-title.sql", () => {
      it("should update the title of the specified painting", async () => {
        const queryText = sqlReader("update-painting-title");
        const response = await client.query(queryText);

        expect(response.command).toEqual("UPDATE");
        expect(response.rowCount).toEqual(1);

        const title = "Landschaft mit Netzflickerinnen";
        const select = `SELECT * FROM artworks WHERE title = '${title}'`;
        const result = await client.query(select);
        expect(result.rowCount).toEqual(1);
      });
    });

    describe("delete-all-paintings.sql", () => {
      it("should delete all of the paintings from the table", async () => {
        const queryText = sqlReader("delete-all-paintings");
        const response = await client.query(queryText);

        expect(response.command).toEqual("TRUNCATE");
        expect(response.rowCount).toBeNull();

        const select = `SELECT * FROM artworks;`;
        const { rows } = await client.query(select);
        expect(rows.length).toEqual(0);
      });
    });

    describe("delete-august-paintings.sql", () => {
      it("should delete all paintings with a completion date of 'August 1882'", async () => {
        const queryText = sqlReader("delete-august-paintings");
        const response = await client.query(queryText);

        expect(response.command).toEqual("DELETE");
        expect(response.rowCount).toEqual(9);

        const select = `SELECT * FROM artworks;`;
        const { rows } = await client.query(select);
        expect(rows.length).toEqual(1);
      });
    });

    describe("delete-one-painting.sql", () => {
      it("should delete the specified painting", async () => {
        const queryText = sqlReader("delete-one-painting");
        const response = await client.query(queryText);

        expect(response.command).toEqual("DELETE");
        expect(response.rowCount).toEqual(1);

        const select = `SELECT * FROM artworks;`;
        const { rows } = await client.query(select);
        expect(rows.length).toEqual(9);

        const title = "Still Life with Cabbage and Clogs";
        const deleted = rows.find((row) => row.title === title);
        expect(deleted).toBeFalsy;
      });
    });
  });
});
