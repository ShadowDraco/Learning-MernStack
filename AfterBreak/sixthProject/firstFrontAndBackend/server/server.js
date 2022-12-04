const express = require('express')
const app = express()
const port = 5000

const colors = require('colors') 
const axios = require('axios')

app.get('/api', (req, res) => {
    const users = 
    [
        { id: 123, name: 'johnny' },
        { id: 456, name: 'bobby' }
    ]

    res.json(users)
})


app.listen(port, (req, res) => {
    console.log(`Listening on port`.white, `${port}`.yellow)
})