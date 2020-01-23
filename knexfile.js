// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,//{
    //   host: process.env.DB_TESTING_HOST,
    //   user: process.env.DB_TESTING_USER,
    //   password: process.env.DB_TESTING_PW,
    //   database: process.env.DATABASE_TESTING,
    //   options: {
    //     port: process.env.DB_TESTING_PORT
    //   }
    // },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  staging: {
    client: "postgresql",
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_STAGING_HOST,
      user: process.env.DB_STAGING_USER,
      password: process.env.DB_STAGING_PW,
      database: process.env.DATABASE_STAGING,
      options: {
        port: process.env.DB_STAGING_PORT
      }
    },
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
    client: "postgresql",
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_PRODUCTION_HOST,
      user: process.env.DB_PRODUCTION_USER,
      password: process.env.DB_PRODUCTION_PW,
      database: process.env.DATABASE_PRODUCTION,
      options: {
        port: process.env.DB_PRODUCTION_PORT
      }
    },
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
  }
};
