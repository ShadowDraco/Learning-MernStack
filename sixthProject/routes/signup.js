const colors = require('colors')

// create a new router
const express = require('express')
const router = express.Router()

// allow for creating new users by including mongoose and schemas
const mongoose = require('mongoose')
const User = require('../models/user')

function createUser(formData) {
    console.log('Creating user'.yellow)

    var user = new User(formData)
    user.save((function (err) {
        if (err) throw err
        console.log("New user:".yellow, `${user}`.blue)
    }))
}

// allows you to get more data from the form post
router.use(express.urlencoded({
    extended: true
}))

router.get('/', (req, res) => {
    console.log('Signup'.gray)
    res.render('signup')
})

router.get('/new', (req, res) => {
    console.log('Signing up'.gray)
    res.redirect('/')
})

router.post('/new', (req, res) => {
    console.log("Requesting signup:\n".red, `${JSON.stringify(req.body)}`.blue)
    // run the function that creates from a model and saves to database 
    createUser(req.body)
    res.render('user')
})

module.exports = router