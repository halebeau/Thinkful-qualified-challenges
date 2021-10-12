const knex = require("../db/connection");

function list() {
  return knex("users").select("*");
}

module.exports = {
  list,
};
