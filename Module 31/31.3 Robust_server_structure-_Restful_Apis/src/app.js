const express = require("express");
const app = express();

const notes = require("./data/notes-data");

app.use(express.json({}))

app.get("/notes/:noteId", (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (!foundNote) {
    next(`Note id not found: ${req.params.noteId}`);
  }
  res.json({ data: foundNote });
});

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

// TODO: Add ability to create a new note
app.post("/notes", (req, res, next) => {
  const { data } = req.body;
  if (!data || !data.text) {
    next(
      "Request was invalid - please make sure the body object contains a data property"
    );
  }
  const { data: { text } = {} } = req.body;
  if (text === "" || !text) {
    res.status(400).send(`Body Text Empty`);
  }
  const newId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0) + 1;
  const newNote = { id: newId, text: text };
  notes.push(newNote);
  res.status(201).json({data : newNote});
});

// TODO: add not found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// TODO: Add error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send(err);
});

module.exports = app;