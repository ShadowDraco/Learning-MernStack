import { useState, createContext } from "react"
import axios from "axios"

import "./App.css"
import Container from "react-bootstrap/Container"

import SignInPage from "./components/Pages/Landing Page/SignInPage"
import LoggedIn from "./components/Pages/UserPage/LoggedIn"
import { useEffect } from "react"
export const UserContext = createContext()
// Store the pokemon that have already been fetched from the api
export const PokemonContext = createContext()
// if requests are made by user display a spinner
export const RequestContext = createContext()

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState()

  const [displayPokemon, setDisplayPokemon] = useState()
  const [displayGenera, setDisplayGenera] = useState()
  const [starterPokemon, setStarterPokemon] = useState([])

  const [playingAnimation, setPlayingAnimation] = useState(false)
  const [spinnerVariant, setSpinnerVariant] = useState("success")

  // Check if there is a display pokemon
  useEffect(() => {
    sessionStorage.getItem("DISPLAYPOKEMON")
      ? fetchDisplayPokemon()
      : getDisplayPokemon()
  }, [])

  // take the first letter to upper case then re-insert the rest of the string
  function Captialize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // get the display pokemon from session storage
  function fetchDisplayPokemon() {
    setDisplayPokemon(JSON.parse(sessionStorage.getItem("DISPLAYPOKEMON")))
    setDisplayGenera(JSON.parse(sessionStorage.getItem("DISPLAYGENERA")))
  }

  // get the display pokemon from the API
  function getDisplayPokemon() {
    console.log("getting display pokemon")
    let pokemonId = Math.floor(Math.random(1153) * 100) + 1

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => {
      // set the display pokemon
      setDisplayPokemon(res.data)
      // get the pokemon's description
      axios.get(res.data.species.url).then(res => {
        setDisplayGenera(res.data.genera[7].genus)
        // add description to session storage
        sessionStorage.setItem(
          "DISPLAYGENERA",
          JSON.stringify(res.data.genera[7].genus)
        )
      })
      // add display pokemon to sessions storage
      sessionStorage.setItem("DISPLAYPOKEMON", JSON.stringify(res.data))
    })
  }

  return (
    <Container className="App bg-dark">
      <RequestContext.Provider
        value={{
          playingAnimation,
          setPlayingAnimation,
          spinnerVariant,
          setSpinnerVariant,
        }}
      >
        <PokemonContext.Provider
          value={{
            displayPokemon,
            displayGenera,
            getDisplayPokemon,
            starterPokemon,
            setStarterPokemon,
          }}
        >
          <UserContext.Provider
            value={{
              userLoggedIn,
              setUserLoggedIn,
              currentUser,
              setCurrentUser,
            }}
          >
            {userLoggedIn ? <LoggedIn /> : <SignInPage />}
          </UserContext.Provider>
        </PokemonContext.Provider>
      </RequestContext.Provider>
    </Container>
  )
}

export default App
