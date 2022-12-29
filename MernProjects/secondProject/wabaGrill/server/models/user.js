// include mongoose because this is a mongoose model
const mongoose = require("mongoose")
const Schema = mongoose.Schema // A schema is a template for the model

const User = new Schema({
  username: String,
  password: String,
  friendCode: String,
  friendList: Array,
  team: Object, // current pokemon team
  bag: Object, // items the user has
  box: Object, // the pokemon not currently being used
})

module.exports = mongoose.model("User", User) // the model is created and exported from the schematic
