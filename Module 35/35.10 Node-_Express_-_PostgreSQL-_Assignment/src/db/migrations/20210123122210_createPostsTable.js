exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("post_id").primary();
    table.string("post_title");
    table.text("post_body");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
