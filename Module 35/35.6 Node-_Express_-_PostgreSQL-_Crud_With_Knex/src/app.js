if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const restaurantsRouter = require("./restaurants/restaurants.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/restaurants", restaurantsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
