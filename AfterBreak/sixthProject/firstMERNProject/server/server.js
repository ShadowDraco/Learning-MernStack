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
    new User({name: username}).save()
}

// await the connection because it can take some time
async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, 
            useUnifiedTopology: true })
        console.log('connected to db')

        User.collection ? console.log('user collection already established') : createUserCollection()

        const users = User.find()

    } catch(err) {
        console.error(err)
    }
}

connect()

app.post('/api', (req, res) => {

})

app.get('/api', (req, res) => {
   
})

app.listen(port, (req, res) => {
    console.log('listening on port', port)
})