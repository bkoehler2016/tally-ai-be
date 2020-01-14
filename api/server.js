const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// ROUTERS

// CUSTOM MIDDLEWARE

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use('/api/auth/', authRouter);

module.exports = server;
