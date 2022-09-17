const express = require('express')
const app = express();
const port = 3000

// set the default server folder to be the public folder
app.use(express.static('public'))
app.set('view engine', 'ejs'); // make the server use ejs template rendering

// index page is /
app.get('/', (req, res) => {
    // current Logged user will appear when someone logs in
    res.render('index')
})

// get routes for users and uuser signups
const userRouter = require('./routes/user')
app.use('/user', userRouter)

// get route for saving data to a user
const saveRouter = require('./routes/save')
app.use('/save', saveRouter)

// make the server listen to requests
app.listen(port, (req, res) => {
    console.log('listening on port', port)
})