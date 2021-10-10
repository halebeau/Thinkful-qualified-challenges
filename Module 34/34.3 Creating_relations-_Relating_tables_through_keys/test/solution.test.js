const { Client } = require("pg");

const { USER, DATABASE_URL } = process.env;
const connectionString = DATABASE_URL || (USER
  ? `postgres://localhost/${USER}`
  : "postgres://postgres@localhost/postgres");

const config = { connectionString };

const sqlReader = require("./sqlReader");

describe("Database Tests", () => {
  const client = new Client(config);
  beforeAll(async () => {
    try {
      await client.connect();
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

  it("should connect to a database", async () => {
    const client = new Client(config);
    await client.connect();
    await client.query("LISTEN foo");
    await client.on("notification", async (message) => {
      expect(message.channel).toEqual("foo");
    });
    await client.end();
  });

  describe("artists.sql", () => {
    it("should create an artists table", async () => {
      const queryText = sqlReader("artists");
      const response = await client.query(queryText);
      expect(response.command).toEqual("CREATE");
    });

    it("should have a first_name varchar field that limits to 255 characters", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'artists';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "artist_name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a genre_name varchar field that limits to 100 characters", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'artists';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "genre_name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(100);
    });
  });

  describe("songs.sql", () => {
    it("should create a songs table", async () => {
      const queryText = sqlReader("songs");
      const response = await client.query(queryText);
      expect(response.command).toEqual("CREATE");
    });

    it("should have a song_name varchar field that limits to 100 characters and has a default value", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'songs';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "song_name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(100);
      expect(field.column_default.length > 0).toBe(true);
    });

    it("should have a album_name varchar field that limits to 100 characters and has a default value", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'songs';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "album_name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(100);
      expect(field.column_default.length).toBeGreaterThan(0);
    });

    it("should have an artist integer foreign key field", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'songs';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "artist");
      expect(field).toHaveProperty("data_type", "integer");
    });
  });

  describe("concerts.sql", () => {
    it("should create a concerts table", async () => {
      const queryText = sqlReader("concerts");
      const response = await client.query(queryText);
      expect(response.command).toEqual("CREATE");
    });

    it("should have a concert_name varchar field that limits to 255 characters", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'concerts';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "concert_name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a concert_date date field", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'concerts';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "concert_date");
      expect(field).toHaveProperty("data_type", "date");
    });
  });

  describe("artists_concerts.sql", () => {
    it("should create an artists_concerts table", async () => {
      const queryText = sqlReader("artists_concerts");
      const response = await client.query(queryText);
      expect(response.command).toEqual("CREATE");
    });

    it("should have an artist_id integer foreign key field", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'artists_concerts';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "artist_id");
      expect(field).toHaveProperty("data_type", "integer");
    });

    it("should have a concert_id integer foreign key field", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'artists_concerts';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "concert_id");
      expect(field).toHaveProperty("data_type", "integer");
    });

    it("should have a scheduled_start_at date field", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'artists_concerts';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find(
        (row) => row.column_name === "scheduled_start_at"
      );
      expect(field).toHaveProperty("udt_name", "time");
    });

    it("should have a scheduled_end_at date field", async () => {
      const queryText = `
        select *
        from information_schema.columns
        where table_name = 'artists_concerts';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "scheduled_end_at");
      expect(field).toHaveProperty("udt_name", "time");
    });
  });
});
