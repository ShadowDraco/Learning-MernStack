const express = require("express")
const router = express.Router()

const colors = require("colors")

// allow router to use json // maybe?
router.use(express.json())

router.get("/", (req, res) => {
  console.log("user route accessed".gray)
})

module.exports = router
