const axios = require('axios')
const express = require('express')
const router = express.Router()

require('dotenv').config()

// books from the bible api
var books = null 

router.get('/', (req, res) => {
    res.render('bible', { 
        motd: "A good shepherd leaves the 99!", 
        pageTitle: "Do some bible study!", 
        votd: "Psalm 116 - Preserve me oh Lord so I can serve you - David", 
    })
})

router.get('/search', (req, res) => {
    console.log('searching!')
    books = axios.get("https://api.scripture.api.bible/v1/bibles/f72b840c855f362c-04/books", {
        headers: {
            'api-key': ` ${process.env.BIBL_-API}`
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

module.exports = router