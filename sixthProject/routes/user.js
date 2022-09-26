const colors = require('colors')

// create a new router
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    console.log('User'.gray)
    
    const User = require('../models/user')

    User.find( { username: ""})

    res.render('user', {
        currentUser: "Frolic"
    })
    
})

module.exports = router