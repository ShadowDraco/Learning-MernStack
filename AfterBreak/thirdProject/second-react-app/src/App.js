import React from "react"

// import styles
import "./App.css"

// Import components
import Navbar from "./components/Navbar.js"
import Pricing from "./components/Pricing.js"
import About from "./components/About.js"
import Home from "./components/Home.js"

function App() {
  // define a dynamic component that will chang ebased on the page url
  let component
  // set the component to render
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break

    case "/pricing":
      component = <Pricing />
      break
    case "/about":
      component = <About />
      break

    default:
      component = <Home />
      break
  }

  // return the Application
  return (
    <div className="App">
      <Navbar />

      {component}
    </div>
  )
}

export default App
