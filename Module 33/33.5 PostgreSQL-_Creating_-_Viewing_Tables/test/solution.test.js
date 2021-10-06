const { Client } = require("pg");

const { USER, DATABASE_URL } = process.env;
const connectionString = DATABASE_URL || (USER
  ? `postgres://localhost/${USER}`
  : "postgres://postgres@localhost/postgres");

const config = { connectionString };

const sqlReader = require("./sqlReader");
const queries = {
  artists: sqlReader("artists"),
  museums: sqlReader("museums"),
  paintings: sqlReader("paintings"),
};

describe("Database Tests", () => {
  it("should connect to a database", async () => {
    const client = new Client(config);
    const response = await client.connect();
    await client.end();
    expect(response).toBeTruthy;
  });

  describe("artists.sql", () => {
    const client = new Client(config);
    beforeAll(async () => await client.connect());
    afterAll(async () => {
      const queryText = "DROP TABLE IF EXISTS artists;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    it("should create an artists table", async () => {
      const response = await client.query(queries.artists);
      expect(response.command).toEqual("CREATE");
    });

    it("should have a first_name varchar field that limits to 255 characters", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'artists';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "first_name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a last_name varchar field that limits to 255 characters", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'artists';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "last_name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a birthday date field", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'artists';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "birthday");
      expect(field).toHaveProperty("udt_name", "date");
    });

    it("should have a is_alive boolean field", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'artists';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "is_alive");
      expect(field).toHaveProperty("udt_name", "bool");
    });
  });

  describe("museums.sql", () => {
    const client = new Client(config);
    beforeAll(async () => await client.connect());
    afterAll(async () => {
      const queryText = "DROP TABLE IF EXISTS museums;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    it("should create an museums table", async () => {
      const response = await client.query(queries.museums);
      expect(response.command).toEqual("CREATE");
    });

    it("should have a name varchar field that limits to 255 characters", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'museums';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a city varchar field that limits to 255 characters", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'museums';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "city");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a state varchar field that limits to 2 characters", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'museums';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "state");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(2);
    });
  });

  describe("paintings.sql", () => {
    const client = new Client(config);
    beforeAll(async () => await client.connect());
    afterAll(async () => {
      const queryText = "DROP TABLE IF EXISTS paintings;";
      try {
        await client.query(queryText);
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    it("should create an paintings table", async () => {
      const response = await client.query(queries.paintings);
      expect(response.command).toEqual("CREATE");
    });

    it("should have a name varchar field that limits to 255 characters", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'paintings';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "name");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a medium varchar field that limits to 255 characters", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'paintings';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "medium");
      expect(field).toHaveProperty("udt_name", "varchar");
      expect(field.character_maximum_length).toEqual(255);
    });

    it("should have a description text field", async () => {
      const queryText = `
        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'paintings';
      `;
      const { rows } = await client.query(queryText);
      const field = rows.find((row) => row.column_name === "description");
      expect(field).toHaveProperty("udt_name", "text");
    });
  });
});
