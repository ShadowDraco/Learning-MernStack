const axios = require('axios')
const express = require('express')
const router = express.Router()

const fs = require('fs')
const { findSourceMap } = require('module')

router.use(express.urlencoded({
    extended: true
}))

router.get('/', (req, res) => {
    res.send('user')
})

router.get('/signup', (req, res) => {
    console.log('signup')
})

router.post('/signup', (req, res) => {
    
    // read the file and then add the new user
    fs.readFile('users.json', 'utf8', function readFileCallBack(err, data) {
        if (err) {
            console.log(err)
        } else {
            let allUsers = JSON.parse(data)
            allUsers.push(req.body)

            fs.writeFile('users.json', JSON.stringify(allUsers), function (err) {
                if (err) {
                    console.log(err)
                }
                console.log('user saved')
                res.redirect("/")
            })
        }
    })
})


module.exports = router