const axios = require('axios')
const express = require('express')
const router = express.Router()

require('dotenv').config()

router.get('/', (req, res) => {
    console.log('searching king james!')
    books = axios.get(`https://api.scripture.api.bible/v1/bibles/${bibles['King James']}/books`, {
        headers: {
            'api-key': `${process.env.BIBLE_API}`
        }   
    }).then (function(response) {
        res.render('bible', { 
                motd: "A good shepherd leaves the 99!", 
                pageTitle: "Do some bible study!", 
                votd: "Psalm 116 - Preserve me oh Lord so I can serve you - David", 
                books: response.data
        })
    })
})

router.get('fafas', (req, res) => {
    console.log(req.originalUrl)
})

module.exports = router