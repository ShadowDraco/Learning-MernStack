const colors = require('colors')

// create a new router
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// allow formdata to be passed
router.use(express.urlencoded({
    extended: true
}))

router.get('/', (req, res) => {
    console.log('Login'.gray)
    res.render('login')
})

router.get('/user', (req, res) => {
    console.log('Logging'.gray)
    res.redirect('/user')
})

router.post('/user', (req, res, next) => {
    console.log("Requesting Login:".yellow, `${JSON.stringify(req.body)}`.blue)

    

    res.render('user', {
        currentUser: req.body
    })
})

module.exports = router