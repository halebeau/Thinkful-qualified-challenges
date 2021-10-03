const express = require("express");
const app = express();

const path = require("path");
const notes = require(path.resolve("src/data/notes-data"));
const notesRouter = require("./notes/notes.router");

app.use(express.json());

//Routes
app.use("/notes", notesRouter);

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
