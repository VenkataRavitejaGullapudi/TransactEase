const express = require("express");
const userRouter = require("./user");

const rootRouterV1 = express.Router();

rootRouterV1.use("/user", userRouter);

module.exports = rootRouterV1;
