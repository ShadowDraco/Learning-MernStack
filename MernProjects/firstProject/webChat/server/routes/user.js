const express = require('express')
const router = express.Router()

const User = require('../models/user')
const db = require('../server')

router.get('/', async (req, res) => {
    console.log('getting users')
    let users = await User.find()
    users ? console.log('success') : console.log('no users available')
})

router.get('/create', async (req, res) => {
    console.log('creating new user')

})

module.exports = router