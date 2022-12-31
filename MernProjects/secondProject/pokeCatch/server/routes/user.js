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
      choseStarterPokemon: false,
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
  let status
  try {
    let foundUser = await User.findOne({
      username: username,
      password: password,
    })

    if (foundUser) {
      console.log("found user!".green)
      status = "success"
    } else {
      console.log("did not find user".red)
      status = "failed"
    }
    return { user: foundUser, status: status }
  } catch (error) {
    console.log("error finding user".red)
    console.log(error)
    return { status: status }
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

  let loggedUser = await loginUser(req.body.username, req.body.password)
  res.json(loggedUser)
})

async function updateUser(user) {
  return await User.findOne({ _id: user._id })
}

async function getNewItemQuantity(user, item, quantity) {
  let newQuantity
  let didStackItem = false
  let foundItem = false
  let newItem

  user.bag.forEach(bagItem => {
    if (bagItem.name === item.name) {
      foundItem = true
      newItem = bagItem
      return
    }
  })

  if (foundItem) {
    console.log("adding to previous quantity")
    newQuantity = newItem.quantity + quantity
    didStackItem = true
  } else {
    console.log("quanity remains, no stacking")
  }

  return { newQuantity: newQuantity, didStackItem: didStackItem }
}

async function addItemToBag(user, item, quantity) {
  // check the user's bag and get a quantity for item stacking
  let itemQuantityResults = await getNewItemQuantity(user, item, quantity)

  if (itemQuantityResults.didStackItem) {
    return await User.updateOne(
      { _id: user._id, "bag.name": item.name },
      { $set: { "bag.$.quantity": itemQuantityResults.newQuantity } }
    )
  } else {
    return await User.updateOne({ _id: user._id }, { $push: { bag: item } })
  }
}

router.post("/add-item", async (req, res) => {
  console.log("adding item".yellow)
  let user = req.body.user

  try {
    let addedItem = await addItemToBag(
      user,
      req.body.item,
      parseInt(req.body.quantity) // parse becasue req becomes string
    )
    console.log("added item".green)

    res.send({
      updatedUser: await updateUser(user),
      addedItem: addedItem,
      status: "successfully added item",
    })
  } catch (error) {
    console.log("error adding item".red)
    console.log(error)
    res.send({
      status: "failed to add item",
      error: error,
      updatedUser: await updateUser(user),
    })
  }
})

router.post("/add-pokemon-to-team", async (req, res) => {
  console.log("adding a pokemon to user's team".yellow)

  let user = await updateUser(req.body.user)

  // if the user has already chosen a starter skip this
  if (user.choseStarterPokemon) {
    console.log("user already chose a starter".red)
    res.send({ updatedUser: user, message: "already chose starter" })
  } else {
    let addedPokemon
    try {
      addedPokemon = await User.updateOne(
        { _id: user._id },
        {
          $push: { team: req.body.pokemon },
          $set: { choseStarterPokemon: true },
        }
      )
      console.log("added pokemon")
      res.send({
        status: "succesfully added pokemon to team",
        addedPokemon: addedPokemon,
        updatedUser: await updateUser(user),
      })
    } catch (error) {
      console.log("error adding pokemon to team")
      console.log(error)
      res.send({
        status: "failed to add pokemon",
        error: error,
        updatedUser: await updateUser(user),
      })
    }
  }
})

module.exports = router
