exports.up = function (knex) {
  return knex.schema.createTable("restaurants", (table) => {
    table.increments("restaurant_id").primary();
    table.string("restaurant_name");
    table.string("cuisine");
    table.string("address");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("restaurants");
};
