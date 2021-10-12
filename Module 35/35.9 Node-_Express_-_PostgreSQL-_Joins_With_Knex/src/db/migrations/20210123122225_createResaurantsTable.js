exports.up = function (knex) {
  return knex.schema.createTable("restaurants", (table) => {
    table.increments("restaurant_id").primary();
    table.string("restaurant_name").notNullable();
    table.string("cuisine").notNullable();
    table.string("address").notNullable();
    table.decimal("rating").notNullable();
    table.integer("owner_id").unsigned().notNullable();
    table
      .foreign("owner_id")
      .references("owner_id")
      .inTable("owners")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("restaurants");
};
