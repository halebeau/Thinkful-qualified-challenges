exports.up = function (knex) {
  return knex.schema.createTable("restaurants", (table) => {
    table.increments("restaurant_id").primary();
    table.string("restaurant_name").notNullable();
    table.string("cuisine", null).notNullable();
    table.string("address", null).notNullable();
    table.decimal("rating").unsigned().notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("restaurants");
};
