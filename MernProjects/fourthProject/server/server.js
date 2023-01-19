const express = require("express")
const app = express()

// require dotenv before using it for things
require("dotenv").config()
const port = process.env.PORT

// easy console colors
const colors = require("colors")

// set up mongo database
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI

// allow the server to send and recieve json requests
app.use(express.json({ limit: "5mb" })) // increase size limit of requests
app.use(express.urlencoded({ limit: "5mb" }))

// allow the server to bypass cors issues with origins
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

function connect() {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  db = mongoose.connection
  console.log("database connected".blue)
}
connect()

// get home route
app.get("/", (req, res) => {
  console.log("Home route accessed".blue)
})

// check server status
app.get("/healthy", (req, res) => {
  console.log("The server is healthy! :)".green)
  res.status(200).json({ status: 200, message: "Healthy Server" })
})

// include a router for user routes
const userRouter = require("./routes/user")
app.use("/user", userRouter)

app.listen(port, (req, res) => {
  console.log(`listening on port `.gray, `${port}`.yellow)
})
