const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// ROUTERS
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const googleRouter = require('../google/google-router');
const businessRouter = require('../businesses/business-router')
const searchRouter = require('../search/search-router')

// CUSTOM MIDDLEWARE
const authMiddleware = require("../auth/authenticate-middleware");


const server = express();

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
server.use('/api/business', authMiddleware, businessRouter)
server.use('/api/google', googleRouter);
server.use('/api/search', searchRouter)

server.get('/', (req, res) => {
    res.status(200).json(`Sanity Check`);
});

module.exports = server;
