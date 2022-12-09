const { default: axios } = require('axios')
const express = require('express')
const app = express()
const port = 5000

require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uri = process.env.MONGO_URI

const UserSchema = new Schema({
    name: {type: String, required: true}
})
const User = mongoose.model('User', UserSchema)

async function createUserCollection() {
    await User.createCollection()
    new User({ name: "admin" }).save() 
    console.log('established new user collection')
}

async function createNewUser(username) {
   await new User({name: username}).save()
   console.log('created new user')
}

// await the connection because it can take some time
async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, 
            useUnifiedTopology: true })
        console.log('connected to db')

        User.collection ? console.log('user collection already established') : createUserCollection()

    } catch(err) {
        console.error(err)
    }
}

connect()

// allow the server to recieve json from the front end
app.use(express.json())

app.post('/api/newUser', (req, res) => {
    console.log('posted')
    createNewUser(req.body.name)
})

app.get('/api/getUsers', async (req, res) => {
    const allUsers = await User.find()
    res.json(allUsers)
})


app.listen(port, (req, res) => {
    console.log('listening on port', port)
})