const express = require("express");
const app = express();
const notesRouter = require("./notes/notes.router");
const ratingsRouter = require('./ratings/ratings.router')

app.use(express.json());
app.use("/notes", notesRouter);
app.use('/ratings', ratingsRouter)

// Not found handler
app.use((req, res, next) => {
  return next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;