const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create the default user schema
const UserSchema = new Schema({
    username: String,
    password: String,
    color: String,
})

// give the user a url for lookup-
UserSchema.virtual('url').get(function (){
    return `/user/${this._id}`
})


//export the model for outside use
                // turn the schema into a model before exporting so the model can be used for creating new users
module.exports = mongoose.model("UserModel", UserSchema)