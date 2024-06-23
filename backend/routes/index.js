const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const rootRouterV1 = express.Router();

rootRouterV1.use("/user", userRouter);
rootRouterV1.use("/account", accountRouter);

module.exports = rootRouterV1;
