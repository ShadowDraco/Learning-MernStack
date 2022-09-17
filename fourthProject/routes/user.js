const express = require('express')
const router = express.Router()

// require the filesystem
const fs = require('fs')

// The current logged in user
let currentLoggedUser

// allows you to get more data from the form post
router.use(express.urlencoded({
    extended: true
}))

/* 

sign up
*/

router.get('/', (req, res) => {
    res.send("user page: not what you're looking for")
})

router.get('/signup', (req, res) => {
    res.send('signing up')
})

router.post('/signup', (req, res) => {
    console.log(req.body) 
    // get the entire user.json file and append a user to the end
    fs.readFile('users.json', 'utf8', function readFileCallBack(err, data) {

        if (err) {
            throw err   
        } else { // if there is no error add the userdata to the file
            allUsers = JSON.parse(data)
            allUsers.push(req.body)
            
            // after pushing the new data replace the file
            fs.writeFile('users.json', JSON.stringify(allUsers), function(err) {
                if (err) throw err

                console.log('user saved')
                res.redirect('/')

            })
        }

    })// end read file
})

/*
save 
todo
list
*/

router.get('/save-todo', (req, res) => {
    res.send('saving items')
})

router.post('/save-todo', (req, res) => {
    console.log(req.body)

    // Check if a user is signed in then read the users 
    if (currentLoggedUser) {
        // read users and add the saved-todo to the current user
        fs.readFile('users.json', 'utf8', function readFileCallBack(err, data) {

            if (err) {
                throw err
            } else {
                // get all users
                let allUsers = JSON.parse(data)
                
                allUsers.forEach(function(user) {
                    if (user.id == currentLoggedUser.id) {
                        console.log(user)
                        user.todo = req.body
                    }
                })
    

                fs.writeFile('users.json', JSON.stringify(allUsers), function(err) {
                    if (err) throw err
            
                    console.log('user saved')
                    res.redirect(`/user/${currentLoggedUser.id}`)
            
                })
            }

        })

    } else {
        console.log('user not signed in')
    }
})

/*
Login 
route
*/
router.route("/:userID").get((req, res) => {
    res.render('index', { 
        loggedUser: currentLoggedUser,                          
    })
})

router.post('/login', (req, res) => {

    let login = req.body

    fs.readFile('users.json', 'utf8', function readFileCallBack(err, data) {

        allUsers = JSON.parse(data)
        console.log(allUsers)
       
        if (err) {
            throw err
        }
        else {
           
           allUsers.forEach(function(user) {
            // check username
                if (user.username == login.username) {
                    console.log('found user')
                    
                    // check pasword
                    if (user.password == login.password) {
                        console.log('correct password')
                        // find out ho to use req.currentUser
                        currentLoggedUser = user;
                        res.redirect(`/user/${user.id}`)
                    } else {
                        console.log('incorrect password!')
                    } 

                // if no username is found
                } else {
                    console.log('no user with that name exists')
                }
           })
        }
    })
})

router.param("userID", (req, res, next, userID) => {
    console.log(userID)
    next()
})

module.exports = router;