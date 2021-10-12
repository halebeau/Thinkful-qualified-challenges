exports.up = function (knex) {
  return knex.schema.createTable("owners", (table) => {
    table.increments("owner_id").primary();
    table.string("owner_name").notNullable();
    table.string("email").notNullable();
    table.string("address").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("owners");
};
