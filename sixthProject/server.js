const colors = require('colors') // use console colors

// create server
const express = require('express')
const server = express()
const port = 3000 // create the express server

// set up for connection to database 
const mongoose = require('mongoose')
require('dotenv').config() // allow for using dotenv to save the mongo uri
const mongoURI = process.env.MONGO_URI
// connct to the database
mongoose.connect(mongoURI, { useUnifiedTopology : true})
const db = mongoose.connection // get the default connection


// start running server functions
server.use(express.static('public')) // set the server's default folder 
server.set('view engine', 'ejs') // use ejs view template

server.get('/', (req, res) => {
    console.log("Index".gray)
    res.render('index')
})

const userRoute = require('./routes/user')
server.use('/user', userRoute)

const signupRoute = require('./routes/signup')
server.use('/signup', signupRoute)

const loginRoute = require('./routes/login')
server.use('/login', loginRoute)

server.listen(port, (req, res) => {
    console.log("Server started on port: ".blue, `${port}`.green)
    console.log("Connected to DB @".green, `${mongoURI}`.gray)
})