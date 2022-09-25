const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create a schema that will allow user instanciations to the database
const UserInstanceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    id: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}
})

UserInstanceSchema.virtual('url').get(function () {
    return `/user/userinstance/${this._id}`
})

module.exports = mongoose.model('UserInstance', UserInstanceSchema)