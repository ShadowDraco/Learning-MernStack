// create an express router
const express = require("express")
const router = express.Router()

const colors = require("colors")

// allow the router to use json? maybe its neccessary
router.use(express.json())

router.get("/", (req, res) => {
  console.log("user route".green)
})

module.exports = router
