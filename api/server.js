const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieSession = require('cookie-session');

// ROUTERS
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const googleRouter = require('../google/google-router');

// CUSTOM MIDDLEWARE
const authMiddleware = require("../auth/authenticate-middleware");


const server = express();

// COOKIE SESSION CONFIG
server.use(cookieSession({
    name: 'token',
    keys: ['key1', 'key2'],
}))

server.use(helmet());
server.use(cors());
server.use(express.json());

// CORS HEADERS

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN)
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.header("Access-Control-Allow-Methods", "HEAD,GET,PUT,POST,DELETE")
    next()
})

// ROUTES

server.use("/api/auth", authRouter);
server.use("/api/users", authMiddleware, usersRouter);
server.use('/', googleRouter);

server.get('/', (req, res) => {
    res.status(200).json(`Sanity Check`);
});

module.exports = server;
