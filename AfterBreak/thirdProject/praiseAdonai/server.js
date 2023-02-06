const colors = require('colors') // just for fun console colors

// Include and create express js server
const express = require('express')
const app = express()
const port = 3000

// use a static folder rather than an absolute path
app.use(express.static('public'))
app.set('view engine', 'ejs')

// get the home page
app.get('/', (req, res) => {
	res.render('index', {
		motd: 'Today is the first day of launch!',
		pageTitle: 'Welcome to Praise Adonai!',
	})
})

// include the bible route
const bibleRoute = require('./routes/bible')
app.locals.books = ''
app.use('/bible', bibleRoute)

// other routes unimplemented
app.get('/music', (req, res) => {
	res.render('music', {
		motd: 'We sing holy holy holy!',
		pageTitle: 'Find good music!',
	})
})
app.get('/faith', (req, res) => {
	res.render('faith', {
		motd: 'Faith the size of a mustard seed!',
		pageTitle: 'Learn about The Faith!',
	})
})

// listen on the port for req res cycle
app.listen(port, (req, res) => {
	console.log('Server listening on port:'.blue, `${port}`.white)
})
