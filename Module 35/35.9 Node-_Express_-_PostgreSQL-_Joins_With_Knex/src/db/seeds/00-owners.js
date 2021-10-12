const owners = require("./00-owners.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE owners RESTART IDENTITY CASCADE")
    .then(() => knex("owners").insert(owners));
};
