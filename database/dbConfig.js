const knex = require("knex");

const knexConfig = require("../knexfile.js");

const environment = process.env.ENVIRONMENT;

if (environment === production) {
  module.exports = knex(knexConfig.production);
} else {
  module.exports = knex(knexConfig.staging);
}
