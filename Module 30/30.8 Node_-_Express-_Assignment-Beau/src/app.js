const express = require("express")
const app = express()


const validateZip = require("./middleware/validateZip")
const getZoos = require("./utils/getZoos")


app.get("/check/:zip",
       validateZip,
       (req, res, next) =>{
    if(getZoos(req.params.zip)){
    const message = `${req.params.zip} exists in our records.`
    res.send(message)
    } else{
     res.send(`${req.params.zip} does not exist in our records.`)
    }
    })

app.get("/zoos/all",
       (req, res, next) =>{
  const zoo = getZoos();
    if(req.query.admin === "true"){
    const message = `All zoos: ${zoo.join("; ")}`
    res.send(message)
    } else{
     res.send("You do not have access to that route.")
    }
})

app.get("/zoos/:zip",
       validateZip,
       (req, res, next) =>{
    const zoo = getZoos(req.params.zip)
    if(zoo.length !== 0){
    const message = `${req.params.zip} zoos: ${zoo.join("; ")}`
    res.send(message)
    } else{
     res.send(`${req.params.zip} has no zoos.`)
    }
})


app.use((req, res, next) => {
  next("That route could not be found!");
});

app.use((err, req, res, next) => {
  err = err || "Internal server error!";
  res.send(err);
});
module.exports = app