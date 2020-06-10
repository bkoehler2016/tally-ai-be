// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/testDB.db3"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  testing: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: `postgres://${process.env.DB_PRODUCTION_USER}:${process.env.DB_PRODUCTION_PW}@${process.env.DB_PRODUCTION_HOST}:${process.env.DB_PRODUCTION_PORT}/${process.env.DATABASE_PRODUCTION}`,
    //process.env.DATABASE_URL + '?ssl=1',
    // {
    //   host: process.env.DB_PRODUCTION_HOST,
    //   user: process.env.DB_PRODUCTION_USER,
    //   password: process.env.DB_PRODUCTION_PW,
    //   database: process.env.DATABASE_PRODUCTION,
    //   options: {
    //     port: process.env.DB_PRODUCTION_PORT
    //   }
    // },
    pool: {
      min: 0,
      max: 7
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
