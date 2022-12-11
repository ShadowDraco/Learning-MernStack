const express = require('express')
const router = express.Router()

const User = require('../models/user')
const db = require('../server')

/* =-----------= */
/* =-----------= */
/* =-----------= */
router.use(express.json())

router.get('/', async (req, res) => {
    console.log('getting users')
    let users = await User.find()
    users ? console.log('success') : console.log('no users available')

    res.json(users)
})

async function createNewUser(username, password) {
    let friendCode = Math.random(10)
    friendCode + Math.random(10)  

    try {
        await new User({username: username, password: password, friendCode: friendCode, friendList: {}, messages: {}}).save()
        console.log('user created')
        return(true)
    } catch(err) {
        console.log('err')
        return(false)
    }
}

function loginUser(username, password) {
    let foundUser = User.findOne({username: username, password: password}, 'username password')
    return foundUser 
}

router.post('/create', (req, res) => {
    console.log('creating new user')
    res.created = createNewUser(req.body.username, req.body.password)
    res.send({ created: true})
})

router.post('/login', async (req, res) => {
    console.log('attempting login')
    let user = await loginUser(req.body.username, req.body.password)
    user ? res.json(user) : res.send(false)
})

router.post('/add-friend', async (req, res) => {
    console.log('adding friend')
    let friend = await User.findOne({friendCode: req.body.friendCode})
    let currentUser = await User.findOne({_id: req.body.currentUser._id})

    const added = await User.updateOne(currentUser, { $push: {friendList: friend } })
    const adding = await User.updateOne(friend, { $push: {friendList: currentUser } })
    res.send('updated friends list')
})

router.post('/message', async (req, res) => {
    console.log('sending message')
    let userId = req.body.user
    let friendCode = req.body.friend
    let message = req.body.message

    let user = await User.findOne({_id: userId})
    let friend = await User.findOne({ friendCode: friendCode})
    let messageToSend = { from: user.username, message: message }

    let userMessage = await User.updateOne( { _id: user._id }, { $push: { messages: messageToSend }})

    let friendMessage = await User.updateOne( { _id: friend._id }, { $push: { messages: messageToSend }})
    console.log(friend)
 
    res.send('updated messages')


})

router.get('/friend/:code', async (req, res) => {
    console.log('getting a friend to chat')
    let friendCode = req.params.code
    res.json(await User.findOne( { friendCode: friendCode }))
})

router.get('/:id', async (req, res) => {
    console.log('displaying friends list')
    let user = await User.find({ _id: req.params.id})
    res.json(user[0])
    
})

module.exports = router