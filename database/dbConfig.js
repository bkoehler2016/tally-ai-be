// const knex = require("knex");

// const knexConfig = require("../knexfile.js");

// const environment = process.env.ENVIRONMENT;

// if (environment === "production") {
//   module.exports = knex(knexConfig.production);
// } else if (environment === "staging") {
//   module.exports = knex(knexConfig.staging);
// } else {
//   module.exports = knex(knexConfig.development);
// }

const knex = require("knex");

const config = require("../knexfile");

const dbEnv = process.env.DB_ENV || 'development'

module.exports = knex(config[dbEnv]);
