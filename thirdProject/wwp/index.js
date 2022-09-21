// start local host server
const express = require('express')
const app = express() // app is the server itself
const port = 3000
const path = require('path') // for giving path variables to things

const colors = require('colors')
const { resolveSoa } = require('dns')

app.use(express.static('public'))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

const userRouter = require('./routes/userRoutes')
app.use('/user', userRouter)

app.listen(port, (req, res) => {
    console.log("listening:".yellow)    
})