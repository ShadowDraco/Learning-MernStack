const axios = require("axios")
const express = require("express")
const router = express.Router()

require("dotenv").config()

// books from the bible api
var books = null
var bibles = {
  "King James": "de4e12af7f28f599-02",
  "World Messianic": "f72b840c855f362c-04",
}
var bible = bibles["King James"]

router.get("/", (req, res) => {
  res.render("bible", {
    motd: "A good shepherd leaves the 99!",
    pageTitle: "Do some bible study!",
    votd: "Psalm 116 - Preserve me oh Lord so I can serve you - David",
  })
})

router.get("/king-james", (req, res) => {
  console.log("searching king james!")
  books = axios
    .get(
      `https://api.scripture.api.bible/v1/bibles/${bibles["King James"]}/books`,
      {
        headers: {
          "api-key": `${process.env.BIBLE_API}`,
        },
      }
    )
    .then(function (response) {
      res.render("bible", {
        motd: "A good shepherd leaves the 99!",
        pageTitle: "Do some bible study!",
        votd: "Psalm 116 - Preserve me oh Lord so I can serve you - David",
        books: response.data,
      })
    })
})

router.get("/king-james/", (req, res) => {
  console.log("searching king james!")
  books = axios
    .get(
      `https://api.scripture.api.bible/v1/bibles/${bibles["King James"]}/books`,
      {
        headers: {
          "api-key": `${process.env.BIBLE_API}`,
        },
      }
    )
    .then(function (response) {
      res.render("bible", {
        motd: "A good shepherd leaves the 99!",
        pageTitle: "Do some bible study!",
        votd: "Psalm 116 - Preserve me oh Lord so I can serve you - David",
        books: response.data,
      })
    })
})

router.get("/world-messianic", (req, res) => {
  console.log("searching messianic!")
  books = axios
    .get(
      `https://api.scripture.api.bible/v1/bibles/${bibles["World Messianic"]}/books`,
      {
        headers: {
          "api-key": `${process.env.BIBLE_API}`,
        },
      }
    )
    .then(function (response) {
      res.render("bible", {
        motd: "A good shepherd leaves the 99!",
        pageTitle: "Do some bible study!",
        votd: "Psalm 116 - Preserve me oh Lord so I can serve you - David",
        books: response.data,
      })
    })
})

module.exports = router
