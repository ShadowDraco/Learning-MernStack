const colors = require('colors') // just for fun console colors

// Include and create express js server
const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { motd: "Today is the first day of launch!", header: "Welcome to Praise Adonai!"})
})

app.get('/bible', (req, res) => {
    res.render('bible', { motd: "still being implmented!", header: "Do some bible study!"})
})
app.get('/music', (req, res) => {
    res.render('music', { motd: "still being implmented!", header: "Find good music!"})
})
app.get('/faith', (req, res) => {
    res.render('faith', { motd: "still being implmented!", header: "Learn about The Faith!"})
})

app.listen(port, (req, res) => {
    console.log('Server listening on port:'.blue, `${port}`.white)
})