// initialize express server
const express = require('express')
const app = express()
const port = 3000

const colors = require('colors')

app.use(express.static('public')) // set the default server folder
app.set('view engine', 'ejs') // make web templates render from ejs files

app.get('/', (req, res) => {
    app.render('index')
})

app.listen(port, (req, res) => {
    console.log('listening on port'.green, `${port}`.red)
})