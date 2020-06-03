const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// ROUTERS
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");

// CUSTOM MIDDLEWARE
const authMiddleware = require("../auth/authenticate-middleware");


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin", process.env.ORIGIN)
    res.header(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Credentials, Authorization"
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

server.use("/api/auth", authRouter);
server.use("/api/users", authMiddleware, usersRouter);

server.get('/', (req, res) => {
    res.status(200).json(`Sanity Check`);
});

module.exports = server;
