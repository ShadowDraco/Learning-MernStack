const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a default user Schema
const UserSchema = new Schema({
    id: Number,
    username: String,
    password: String,
})


// allow the user to havea url for look up-
UserSchema.virtual('url').get(function () {
    return `/user/${this._id}`
})

// export the model
module.exports = mongoose.model("UserModel", UserSchema)