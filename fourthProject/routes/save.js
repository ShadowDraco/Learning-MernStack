const express = require('express')
const router = express.Router()

// Save user data to a json object that can be added to

router.get('/todo', (req, res) => {
    res.send('saving todo list')
})

router.post('/todo', (req, res) => {
    console.log(req.body)   
    //res.redirect('/')
})

module.exports = router;