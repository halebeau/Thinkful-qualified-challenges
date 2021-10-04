const express = require("express");
const urlRouter = require('./urls/urls.router')
const usesRouter = require('./uses/uses.router')
const pathNotFound = require('./errors/pathNotFound')

const app = express();

app.use(express.json());
app.use('/urls', urlRouter)
app.use('/uses', usesRouter)

// TODO: Add code to meet the requirements and make the tests pass.

app.use(pathNotFound)

app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });

module.exports = app;
