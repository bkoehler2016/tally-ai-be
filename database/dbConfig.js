const dbEnv = process.env.ENVIRONMENT || 'development'

const knex = require("knex")

const config = require("../knexfile").dbEnv;

const db = knex(config.dbEnv)

module.exports = db
