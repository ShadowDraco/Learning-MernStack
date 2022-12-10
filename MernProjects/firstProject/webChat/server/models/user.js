const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: String,
    password: String,
    friendCode: Number, 
    friendList: Array,
    messages: Array,
})

module.exports = mongoose.model('User', User)