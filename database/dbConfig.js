const dbEnv = process.env.ENVIRONMENT || 'development'

const knex = require("knex")(dbEnv);

const config = require("../knexfile");


module.exports = knex(config[dbEnv]);
