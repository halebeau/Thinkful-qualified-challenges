const users = require("./00-users.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(() => knex("users").insert(users));
};
