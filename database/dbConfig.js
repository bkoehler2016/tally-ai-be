const dbEnv = process.env.ENVIRONMENT || 'development'

const knex = require("knex")(dbEnv)

const config = require("../knexfile").dbEnv;


module.exports = knex(config);
