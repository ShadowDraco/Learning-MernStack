// include and create express server
const express = require('express')
const app = express()
const port = 3000

// include and Create socket.io server 
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)


// allow single folder to contain data
app.use(express.static('public'))
// allow express templates to be used
app.set('view engine', 'ejs')

// home page
app.get('/', (req, res) => {
    res.render('index')
})

// set chat room router
const chat = require('./routes/chat')
app.use('/chat',  chat)


io.on('connection', (socket) => {
    console.log("hello World!!!")
})

// listen for req and res
app.listen(port, (req, res) => {
    console.log("Listening on port: ", port)
})