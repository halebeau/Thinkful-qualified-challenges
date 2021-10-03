const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: return a single user by id from /users/:userId in form of { data: Object }

app.use('/users/:userId', (req, res, next) => {
    const {userId} = req.params
    const user = users.find((user) => user.id === Number(userId))
    if(user) {
        res.json({data:user})
    } else {
        next(`User ID not found: ${userId}`)
    }
})

// TODO: return an array of users from /users in form of { data: Array }

app.use('/users', (req, res, next) => {
    res.json({data:users})
})

// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }

app.use('/states/:stateCode', (req, res, next) => {
    const {stateCode} = req.params
    const state = states[stateCode]
    if(state !== undefined) {
        res.json({data:{stateCode:stateCode, name:state}})
    } else {
        next(`State code not found: ${stateCode}`)
    }
})

// TODO: return all states from /states in the form of { data: Array }

app.use('/states', (req, res, next) => {
    res.json({data:states})
})

// TODO: add not found handler

app.use((req, res, next) => {
    next(`Not found: ${req.originalUrl}`)
})

// TODO: Add error handler

app.use((err, req, res, next) => {
    console.log(err)
    res.send(err)
})

module.exports = app;