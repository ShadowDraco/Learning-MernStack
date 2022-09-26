const colors = require('colors') // console/terminal colors just because

// create an express app
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose') // mongoose for DB conection
require('dotenv').config() // require dotenv for the DB URI
const mongoURI = process.env.MONGO_URI;

// set up default database connection
mongoose.connect(mongoURI, { useNewUrlParser: true, 
useUnifiedTopology: true })

const db = mongoose.connection // get the default connection


// allow the server to have a default file path
app.use(express.static('public'))
app.set('view engine', 'ejs') // make the app render pages with ejs templating

// Get app url's
app.get('/', (req, res) => {
    res.render('index')
    console.log("main page: / ")
})

// make the server work
app.listen(port, (req, res) => {
    console.log('DB URI:\n', `${mongoURI}`.green)
    console.log('Listening on port', `${port}`.blue)
})


const User = require('./models/user')

function userCreate(id, user, pass) {
    console.log('creating user')
    
    userdetail = {
        id: id,
        username: user,
        password: pass
    }

    var user = new User(userdetail)

    user.save(function (err) {
        if (err) throw err
        console.log('new user', `${user}`.blue)
    })
    mongoose.connection.close()
}
