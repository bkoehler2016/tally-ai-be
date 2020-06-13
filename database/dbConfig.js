const knex = require("knex");

const config = require("../knexfile");

const dbEnv = process.env.ENVIRONMENT || 'testing'

module.exports = knex(config[dbEnv]);
