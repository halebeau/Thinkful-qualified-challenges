const express = require("express");
// const cors = require("cors");
const app = express();

const plantsRouter = require("./plants/plants.router");
const usersRouter = require("./users/users.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// This would enable CORS for entire app instead of by method/route/router
// app.use(cors());
app.use(express.json());

app.use("/plants", plantsRouter);
app.use("/users", usersRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
