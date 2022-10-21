const colors = require('colors')

// create a new router
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = require('../models/user')

let currentUser

// allow formdata to be passed properly
router.use(express.urlencoded({
    extended: true
}))
/*
User page
*/

router.get('/', (req, res) => {
    console.log('User'.gray)
    
    User.find( { username: `${req.body.username}`}, "username color", (err, user) => {
        if (err) throw err
        console.log(user)

        res.render('user', {
            currentUser: user.username
        })
    })
    
})

/* 
login page
*/

async function findLogin(req) {


    try {
        console.log("finding login".gray)
        const user = User.where("username").equals(req.body.username).where("password").equals(req.body.password)
        console.log(`${user}`.blue)
    } catch (e) {
        console.log(e.message)
    }
}


router.get('/login', (req, res) => {
    console.log('Login'.gray)
    res.render('login')
})

router.post('/login', (req, res, next) => {
    console.log("Requesting Login:".yellow, `${JSON.stringify(req.body)}`.blue)

    findLogin(req)
})


module.exports = router