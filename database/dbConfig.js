const dbEnv = process.env.ENVIRONMENT || 'development'

const knex = require("knex")(dbEnv)

const config = require("../knexfile");

const db = knex(config.dbEnv)

module.exports = db
