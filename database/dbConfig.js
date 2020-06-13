const knex = require("knex");

const knexConfig = require("../knexfile.js");

const environment = process.env.ENVIRONMENT;

if (environment === "production") {
  module.exports = knex(knexConfig.production);
} else if (environment === "testing") {
  module.exports = knex(knexConfig.testing);
} else {
  module.exports = knex(knexConfig.testing);
}
