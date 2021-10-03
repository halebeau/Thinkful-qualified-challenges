const path = require("path");
const express = require("express");
const app = express();

const notesRouter = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/notes/notes.router"
));

app.use(express.json());

app.use("/notes-router", notesRouter);

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ errors: [message] });
});

module.exports = app;
