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
      team: {},
      bag: {},
      box: {},
    }).save()
    console.log("new user created".green)
    return { status: "Success!", newUser: newUser }
  } catch (error) {
    console.log("Error creating a user!".red)
    console.log(error)
    return { status: "Failed to create a new User" }
  }
}

async function loginUser(username, password) {
  try {
    let foundUser = await User.findOne({
      username: username,
      password: password,
    })

    console.log("found user!".green)
    return { user: foundUser, status: "success" }
  } catch (error) {
    console.log("error finding user".red)
    console.log(error)

    return { status: "failed to find user" }
  }
}

// attempt to sign up a new user
router.post("/signup", async (req, res) => {
  console.log("attempting sign up".yellow)
  console.log(`${req.body}`.red) // display req info

  let newUser = await createNewUser(req.body.username, req.body.password)
  console.log("finished creating user".white)

  // send data back to the browser
  res.json({ message: "received sign up request", status: newUser.status })
})

router.post("/login", async (req, res) => {
  console.log("attempting log in".yellow)
  console.log(`${req.body}`.red)

  let loggedUser = await loginUser(req.body.username, req.body.password)
  res.json(loggedUser)
})

module.exports = router
