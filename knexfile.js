// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/devDB.db3"
    },
    migrations: {
      directory: "./database/migrations"
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
    }
  }
};
