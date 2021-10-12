exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("comment_id").primary();
    table.integer("commenter_id").unsigned().notNullable();
    table
      .foreign("commenter_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");

    table.integer("post_id").unsigned().notNullable();
    table
      .foreign("post_id")
      .references("post_id")
      .inTable("posts")
      .onDelete("CASCADE");
    table.text("comment");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
