const { Client, types } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "postgres://postgres@localhost/postgres";

const config = { connectionString };

const sqlReader = require("./sqlReader");
const sqlSetup = require("./sqlSetup");

const DROP_TABLE_ARTISTS = "DROP TABLE IF EXISTS artists;";

expect.extend({
  toEqualDate,
});

describe("Database Tests", () => {
  describe("Artists", () => {
    let client;
    beforeEach(async () => {
      client = new Client(config);
      await client.connect();
      await client.query(DROP_TABLE_ARTISTS);
      const queryText = sqlReader("artists-create-table");
      await client.query(queryText);
    });
    afterEach(async () => {
      try {
        await client.query(DROP_TABLE_ARTISTS);
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    describe("artists-create.sql", () => {
      test("has specified structure", async () => {
        expect.assertions(7);
        const expected = [
          "artist_id",
          "artist_name",
          "birthday",
          "birthplace",
          "is_alive",
        ];

        const selectResult = await client.query(`SELECT * FROM artists`);

        const fieldNameToField = selectResult.fields.reduce(
          (accumulator, field) => {
            accumulator[field.name] = field;
            return accumulator;
          },
          {}
        );

        const fieldNames = Object.keys(fieldNameToField);

        expect(fieldNames).toHaveLength(expected.length);
        expect(fieldNames).toEqual(expect.arrayContaining(expected));

        expect(fieldNameToField["artist_id"].dataTypeID).toEqual(
          types.builtins.INT4
        );
        expect(fieldNameToField["artist_name"].dataTypeID).toEqual(
          types.builtins.VARCHAR
        );
        expect(fieldNameToField["birthday"].dataTypeID).toEqual(
          types.builtins.DATE
        );
        expect(fieldNameToField["birthplace"].dataTypeID).toEqual(
          types.builtins.VARCHAR
        );
        expect(fieldNameToField["is_alive"].dataTypeID).toEqual(
          types.builtins.BOOL
        );
      });

      test("has unique artist_name", async () => {
        expect.assertions(2);

        const query =
          "INSERT INTO artists (artist_name, birthday, birthplace, is_alive) VALUES ('one', '2020-10-20', 'NYC', TRUE)";

        const firstInsertResult = await client.query(query);

        expect(firstInsertResult.rowCount).toEqual(1);

        await expect(() => client.query(query)).rejects.toEqual(
          expect.objectContaining({
            detail: "Key (artist_name)=(one) already exists.",
          })
        );
      });
    });

    describe("artists-insert.sql", () => {
      test("inserts Wassily Kandinsky", async () => {
        expect.assertions(6);
        const expected = {
          artist_name: "Wassily Kandinsky",
          birthday: expect.toEqualDate(new Date("1866-12-16")),
          birthplace: "Moscow, Russia",
          is_alive: false,
        };

        const insertStatement = sqlReader("artists-insert");

        const insertResponse = await client.query(insertStatement);

        expect(insertResponse.command).toEqual("INSERT");
        expect(insertResponse.rowCount).toEqual(1);

        const response = await client.query("SELECT * FROM artists");

        expect(response.rowCount).toEqual(1);

        const [artist] = response.rows;

        expect(artist).toMatchObject(expected);
        expect(artist.birthday).toBeInstanceOf(Date);
        expect(artist.birthday.toISOString().split("T")[0]).toEqual(
          "1866-12-16"
        );
      });
    });

    describe("artists-insert-multiple.sql", () => {
      test("inserts 4 records", async () => {
        expect.assertions(2);
        const insertStatement = sqlReader("artists-insert-multiple");

        const response = await client.query(insertStatement);

        expect(response.command).toEqual("INSERT");
        expect(response.rowCount).toEqual(4);
      });
    });
  });

  describe("Grants", () => {
    let client;
    beforeEach(async () => {
      client = new Client(config);
      await client.connect();
      const queryText = sqlSetup("grants");
      await client.query(queryText);
    });
    afterEach(async () => {
      try {
        await client.query("DROP TABLE IF EXISTS grants;");
        await client.end();
      } catch (e) {
        console.log(e);
      }
    });

    test("grants-total.sql return the total amount of all grants in the table", async () => {
      expect.assertions(3);
      const queryText = sqlReader("grants-total");
      const response = await client.query(queryText);

      expect(response.command).toEqual("SELECT");
      expect(response.rowCount).toEqual(1);

      const [row] = response.rows;
      expect(row.sum).toEqual("56011726");
    });

    test("grants-total-2016.sql returns the total amount of all grants awarded in 2016", async () => {
      expect.assertions(3);
      const queryText = sqlReader("grants-total-2016");
      const response = await client.query(queryText);

      expect(response.command).toEqual("SELECT");
      expect(response.rowCount).toEqual(1);

      const [row] = response.rows;
      expect(row.sum).toEqual("6790429");
    });

    test('grants-women-2008.sql returns the sum of grants awarded in 2008 where the applicant name contains "Women"', async () => {
      expect.assertions(3);
      const queryText = sqlReader("grants-women-2008");
      const response = await client.query(queryText);

      expect(response.command).toEqual("SELECT");
      expect(response.rowCount).toEqual(1);

      const [row] = response.rows;
      expect(row.sum).toEqual("164100");
    });

    test("grants-categories.sql returns the list of all categories, without duplicates, sorted by the category", async () => {
      expect.assertions(4);
      const expected = {
        category: "Arts and Community Innovative Partnership (ACIP)",
      };

      const queryText = sqlReader("grants-categories");
      const response = await client.query(queryText);

      expect(response.command).toEqual("SELECT");
      expect(response.rowCount).toEqual(14);
      expect(response.fields).toHaveLength(1);

      const [firstRow] = response.rows;
      expect(firstRow).toMatchObject(expected);
    });

    test("grants-year-count-min-max.sql returns the number of grants, minimum amount, and maximum amount, for each fiscal year, without duplicates, sorted by the most recent fiscal year", async () => {
      expect.assertions(4);
      const expected = {
        fiscal_year: expect.toEqualDate(new Date("2016-01-01")),
        count: "170",
        max: 630191,
        min: 3000,
      };

      const queryText = sqlReader("grants-year-count-min-max");
      const response = await client.query(queryText);

      expect(response.command).toEqual("SELECT");
      expect(response.rowCount).toEqual(13);
      expect(response.fields).toHaveLength(4);

      const [firstRow] = response.rows;
      expect(firstRow).toMatchObject(expected);
    });

    test('grants-special-update.sql` updates the grants with category value of "Special Grant" to be "Special Project Grants (SPG)', async () => {
      expect.assertions(4);

      const updateQuery = sqlReader("grants-special-update");
      const updateResponse = await client.query(updateQuery);

      expect(updateResponse.command).toEqual("UPDATE");
      expect(updateResponse.rowCount).toEqual(18);

      const selectQuery =
        "SELECT count(*) FROM grants  WHERE category = 'Special Grant'";
      const selectResponse = await client.query(selectQuery);
      expect(selectResponse.rowCount).toEqual(1);
      expect(selectResponse.rows).toEqual([{ count: "0" }]);
    });

    test('grants-special-delete.sql`: Delete the grants where the category is "SPECIAL"', async () => {
      expect.assertions(4);

      const updateQuery = sqlReader("grants-special-delete");
      const updateResponse = await client.query(updateQuery);

      expect(updateResponse.command).toEqual("DELETE");
      expect(updateResponse.rowCount).toEqual(3);

      const selectQuery =
        "SELECT count(*) FROM grants  WHERE category = 'SPECIAL'";
      const selectResponse = await client.query(selectQuery);
      expect(selectResponse.rowCount).toEqual(1);
      expect(selectResponse.rows).toEqual([{ count: "0" }]);
    });
  });
});

function toEqualDate(actualDate, expectedDate) {
  const actual = actualDate.toISOString().split("T")[0];
  const expected = expectedDate.toISOString().split("T")[0];

  return {
    pass: actual === expected,
    message: () => `Received ${actual} expected ${expected}`,
  };
}
