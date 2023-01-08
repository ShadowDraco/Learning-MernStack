// import express server
const express = require("express")
const app = express()
const port = 5000
// create easy console output colors
const colors = require("colors")

// include mongoose to connect to mongo db
const mongoose = require("mongoose")
require("dotenv").config() // dot env for secret codes
const mongoURI = process.env.MONGO_URI

// allow the server to send and recieve json from requests
app.use(express.json({ limit: "5mb" })) // limit allows for larger requests
app.use(express.urlencoded({ limit: "5mb" }))
// allow the server to bypass CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

async function connect() {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  db = mongoose.connection
  console.log("database connected".blue)
}

// get home
app.get("/", (req, res) => {
  console.log("Home route accessed".blue)
})

// check server status
app.get("/healthy", (req, res) => {
  console.log("The server is healthy :)".green)
  res.status(200).json({ status: 200, message: "healthy server" })
})

// include a router for user routes
const userRouter = require("./routes/user")
app.use("/user", userRouter)

app.listen(port, (req, res) => {
  console.log(`listening on port `.gray, `${port}`.yellow)
  connect()
})
