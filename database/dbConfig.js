const dbEnv = process.env.ENVIRONMENT || 'development'

const knex = require("knex")

const config = require("../knexfile").dbEnv;


module.exports = knex(config);
