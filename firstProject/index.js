// index page written with react 

// Include colors for fun messages -- actually just to practice imports haha
const colors = require("colors")

console.log("Hello".blue)

function MyApp() {
    return (
        <div>
            <h1 className="main-heading">Hello and Welcome to the pageeee!</h1>
            <h4>This page is made with react, jsx, and a few npm packages</h4>
            
            <br></br>

            <p className="time-stamp"> time </p>
        </div>
    )
}

console.log(document);

const root = document.querySelector("#main-content")
root.render(<myApp />)