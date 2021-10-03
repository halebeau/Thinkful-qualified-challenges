const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

// Routes
app.get("/send/:message", (req, res, next) => {
  const message = req.params.message;
  if (message.length < 3) return next("An error occurred: Your message is too short!");
  res.send(`Your message: ${message}`);
});
app.use((req, res, next) => {
  res.send("An error occurred: Could not find route.");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});
// Error Handling

module.exports = app;