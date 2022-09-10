
// dad joke package
const joke = require("give-me-a-joke");
const colors = require("colors");

joke.getRandomDadJoke(function (joke) {
    // .rainbow is a function that extends strings and allows them to have color
    // in the terminal
    console.log(joke.blue);
});