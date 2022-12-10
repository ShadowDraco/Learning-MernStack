const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.MONGO_URI

let db

async function connect() {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    db = mongoose.connection
    console.log('database connected')
}


app.use(express.json())

app.get('/', (req, res) => {
    console.log('home')
})

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(port, (req, res) => {
    console.log('listening on port', port)
    connect()
})

exports.db = db