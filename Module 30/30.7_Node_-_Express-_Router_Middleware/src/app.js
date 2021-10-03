const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

// Middleware
const validateNameLength = require("./utils/validateNameLength");

// Routes
app.get("/hello/:name",
        validateNameLength,
        (req, res, next) => {
          const message = `Hello, ${req.params.name}!`;
          res.send(message);
});

app.get("/goodbye/:name",
        validateNameLength,
        (req, res, next) => {
          const message = `Goodbye, ${req.params.name}.`;
          res.send(message);
});

// Error Handling
app.use((req, res, next) => {
  next("That route could not be found!");
});

app.use((err, req, res, next) => {
  err = err || "Internal server error!";
  res.send(err);
});

module.exports = app;