const restaurants = require("./01-restaurants.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE restaurants RESTART IDENTITY CASCADE")
    .then(() => knex("restaurants").insert(restaurants));
};
