const dbEnv = process.env.ENVIRONMENT || 'testing'

const knex = require("knex")(dbEnv)

const config = require("../knexfile");

const db = knex(config.dbEnv)

module.exports = db
