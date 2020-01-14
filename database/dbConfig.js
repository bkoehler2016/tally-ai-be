const knex = require("knex")({
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DATABASE,
    options: {
      port: process.env.PORT
    }
  }
});

const knexConfig = require("../knexfile.js");
