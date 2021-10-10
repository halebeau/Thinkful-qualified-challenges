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

  describe("Join Queries", () => {
    const client = new Client(config);
    beforeAll(async () => {
      try {
        await client.connect();
        await client.query(sqlSetup("artists"));
        await client.query(sqlSetup("songs"));
        await client.query(sqlSetup("concerts"));
        await client.query(sqlSetup("artists_concerts"));
        await client.query(sqlSetup("seed"));
      } catch (error) {
        console.error(error.stack);
      }
    });
    afterAll(async () => {
      const queryText =
        "drop table if exists artists_concerts, artists, concerts, songs;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (error) {
        console.error(error.stack);
      }
    });

    describe("get-artists-and-songs.sql", () => {
      it("should retrieve all artists and their songs", async () => {
        const queryText = sqlReader("get-artists-and-songs");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(16);

        response.rows.forEach((row) => {
          expect(row).toHaveProperty("artist_id");
          expect(row).toHaveProperty("artist_name");
          expect(row).toHaveProperty("genre_name");
          expect(row).toHaveProperty("song_id");
          expect(row).toHaveProperty("song_name");
          expect(row).toHaveProperty("album_name");
          expect(row).toHaveProperty("artist");
        });
      });
    });

    describe("get-artists-and-songs-selected-columns.sql", () => {
      it("should retrieve all artists and their songs, selected columns only", async () => {
        const queryText = sqlReader("get-artists-and-songs-selected-columns");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(16);

        response.rows.forEach((row) => {
          expect(row).toHaveProperty("artist_id");
          expect(row).toHaveProperty("artist_name");
          expect(row).toHaveProperty("song_name");
          expect(row).not.toHaveProperty("album_name");
          expect(row).not.toHaveProperty("genre_name");
          expect(row).not.toHaveProperty("song_id");
          expect(row).not.toHaveProperty("artist");
        });
      });
    });

    describe("get-artists-by-song-name.sql", () => {
      it('should retrieve all artists with song names that start with `"The"`', async () => {
        const queryText = sqlReader("get-artists-by-song-name");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(3);

        const startsWithThe = response.rows.every(
          (row) => row.song_name.substring(0, 3) === "The"
        );
        expect(startsWithThe).toBe(true);

        response.rows.forEach((row) => {
          expect(row).toHaveProperty("artist_name");
          expect(row).toHaveProperty("album_name");
          expect(row).toHaveProperty("song_name");
          expect(row).not.toHaveProperty("artist_id");
          expect(row).not.toHaveProperty("genre_name");
          expect(row).not.toHaveProperty("song_id");
          expect(row).not.toHaveProperty("artist");
        });
      });
    });

    describe("get-artists-and-concerts.sql", () => {
      it("should retrieve a list of artists and concerts they are performing at", async () => {
        const queryText = sqlReader("get-artists-and-concerts");
        const response = await client.query(queryText);

        expect(response.command).toEqual("SELECT");
        expect(response.rowCount).toEqual(10);

        response.rows.forEach((row) => {
          expect(row).toHaveProperty("artist_name");
          expect(row).toHaveProperty("concert_name");
          expect(row).toHaveProperty("concert_date");
          expect(row).toHaveProperty("scheduled_start_at");
          expect(row).toHaveProperty("scheduled_end_at");
          expect(row).not.toHaveProperty("artist_id");
          expect(row).not.toHaveProperty("genre_name");
          expect(row).not.toHaveProperty("concert_id");
        });
      });
    });
  });
});
