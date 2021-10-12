const comments = require("./02-comments.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE comments RESTART IDENTITY CASCADE")
    .then(() => knex("comments").insert(comments));
};
