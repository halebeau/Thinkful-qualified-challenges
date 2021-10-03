const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

const pong = (req, res) =>{
  res.send("pong!")
}


app.get("/ping", pong)
app.get("/welcome", (req, res)=>{
  res.send("Welcome to my server.")
})

module.exports = app;