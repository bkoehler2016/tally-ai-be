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

  staging: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL + "?ssl=1",
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
    connection: process.env.DATABASE_URL + "?ssl=1",//{
    //   host: process.env.DB_TESTING_HOST,
    //   user: process.env.DB_TESTING_USER,
    //   password: process.env.DB_TESTING_PW,
    //   database: process.env.DATABASE_TESTING,
    //   options: {
    //     port: process.env.DB_TESTING_PORT
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
