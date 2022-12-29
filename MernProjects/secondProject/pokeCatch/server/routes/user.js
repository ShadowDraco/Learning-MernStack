// create an express router
const express = require("express")
const router = express.Router()

const colors = require("colors") // console colors

// allow the router to use json? maybe its neccessary
router.use(express.json())

// home route
router.get("/", (req, res) => {
  console.log("user route".green)
})

// Require the user model to create a new user
const User = require("../models/user")
// Function to define new user creation
async function createNewUser(username, password) {
  let friendCode = Math.random(3)
  friendCode + Math.random(3)

  try {
    let newUser = await new User({
      username: username,
      password: password,
      friendCode: friendCode,
      friendList: {},
      team: Object,
      bag: Object,
      box: Object,
    }).save()
    console.log("new user created".green)
    return { status: "Success!", newUser: newUser }
  } catch (error) {
    console.log("Error creating a user!".red, error)
    return { status: "Failed to create a new User" }
  }
}

// attempt to sign up a new user
router.post("/signup", async (req, res) => {
  console.log("attempting sign up".yellow)
  console.log(`${req.body}`.red) // display req info
  let status = { finished: true }

  let newUser = await createNewUser(req.body.username, req.body.password)
  console.log("finished creating user".white)

  // send data back to the browser
  res.json({ message: "received sign up request", status: newUser.status })
})

module.exports = router
