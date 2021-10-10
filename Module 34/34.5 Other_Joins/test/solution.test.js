const { Client } = require("pg");

const { USER, DATABASE_URL } = process.env;
const connectionString = DATABASE_URL || (USER
  ? `postgres://localhost/${USER}`
  : "postgres://postgres@localhost/postgres");

const config = { connectionString };

const sqlReader = require("./sqlReader");
const sqlSetup = require("./sqlSetup");
const client = new Client(config);

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

  describe("Outer Join Queries", () => {
    beforeAll(async () => {
      try {
        await client.connect();
        await client.query(sqlSetup("artists"));
        await client.query(sqlSetup("songs"));
        await client.query(sqlSetup("seed"));
      } catch (error) {
        console.error(error.stack);
      }
    });
    afterAll(async () => {
      const queryText = "drop table if exists artists, songs;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (error) {
        console.error(error.stack);
      }
    });

    describe("get-all-artists-and-songs.sql", () => {
      it("should retrieve a list of ALL artists and their songs", async () => {
        const queryText = sqlReader("get-all-artists-and-songs");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(18);

        response.rows.forEach((row) => {
          expect(row).toHaveProperty("artist_name");
          expect(row).toHaveProperty("song_name");
          expect(row).toHaveProperty("album_name");
          expect(row).not.toHaveProperty("artist_id");
          expect(row).not.toHaveProperty("genre_name");
          expect(row).not.toHaveProperty("song_id");
          expect(row).not.toHaveProperty("artist");
        });
      });
    });

    describe("get-all-songs-and-artists.sql", () => {
      it("should retrieve a list of ALL songs and their artists", async () => {
        const queryText = sqlReader("get-all-songs-and-artists");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(16);

        response.rows.forEach((row) => {
          expect(row).toHaveProperty("artist_name");
          expect(row).toHaveProperty("song_name");
          expect(row).toHaveProperty("album_name");
          expect(row).not.toHaveProperty("artist_id");
          expect(row).not.toHaveProperty("genre_name");
          expect(row).not.toHaveProperty("song_id");
          expect(row).not.toHaveProperty("artist");
        });
      });
    });

    describe("get-all-songs-and-all-artists.sql", () => {
      it("a list of ALL artists and ALL songs stored in the database", async () => {
        const queryText = sqlReader("get-all-songs-and-all-artists");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(18);

        response.rows.forEach((row) => {
          expect(row).toHaveProperty("artist");
          expect(row).toHaveProperty("song_name");
          expect(row).toHaveProperty("album");
          expect(row).not.toHaveProperty("artist_name");
          expect(row).not.toHaveProperty("album_name");
          expect(row).not.toHaveProperty("artist_id");
          expect(row).not.toHaveProperty("genre_name");
          expect(row).not.toHaveProperty("song_id");
        });
      });
    });
  });
});
