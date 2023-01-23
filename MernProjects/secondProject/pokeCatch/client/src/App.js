import { useState, createContext } from "react"
import axios from "axios"

import "./App.css"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"

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

  // get the display pokemon from session storage
  function fetchDisplayPokemon() {
    setDisplayPokemon(JSON.parse(sessionStorage.getItem("DISPLAYPOKEMON")))
    setDisplayGenera(JSON.parse(sessionStorage.getItem("DISPLAYGENERA")))
  }

  // get the display pokemon from the API
  async function getDisplayPokemon() {
    console.log("getting display pokemon")
    let pokemonId = Math.floor(Math.random(1153) * 100) + 1

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => {
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

  async function requestPokemon(pokemonId, levelToAdd) {
    let requestedPokemon

    setPlayingAnimation(true)
    setSpinnerVariant("success")
    console.log("requesting a pokemon")

    try {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(res => {
          requestedPokemon = res.data
          const hp = requestedPokemon.stats[0].base_stat
          const max_hp =
            hp + Math.floor((Math.random(2) * 100 * levelToAdd) / hp)
          const attack = requestedPokemon.stats[1].base_stat
          const defense = requestedPokemon.stats[2].base_stat
          const special_attack = requestedPokemon.stats[3].base_stat
          const special_defense = requestedPokemon.stats[4].base_stat
          const speed = requestedPokemon.stats[5].base_stat

          requestedPokemon.stats.push({
            level: levelToAdd,
            xp: 0,
            xp_cap: (10 * levelToAdd) / 5,
            max_hp: max_hp,
            hp: max_hp,
            attack:
              attack + Math.floor((Math.random(2) * 100 * levelToAdd) / attack),
            defense:
              defense +
              Math.floor((Math.random(2) * 100 * levelToAdd) / defense),
            special_attack:
              special_attack +
              Math.floor((Math.random(2) * 100 * levelToAdd) / special_attack),
            special_defense:
              special_defense +
              Math.floor((Math.random(2) * 100 * levelToAdd) / special_defense),
            speed:
              speed + Math.floor((Math.random(3) * 100 * levelToAdd) / speed),
          })
          const id = `${levelToAdd}${requestedPokemon.stats[6].hp}${requestedPokemon.stats[6].attack}${requestedPokemon.stats[6].defense}${requestedPokemon.stats[6].special_attack}${requestedPokemon.stats[6].special_defense}${requestedPokemon.stats[6].speed}`

          requestedPokemon.id = id
          requestedPokemon.isStarter = false
          requestedPokemon.isInTeam = false
        })

      // get the pokemon's genera
      await axios.get(requestedPokemon.species.url).then(res => {
        requestedPokemon.genera = res.data.genera[7].genus
      })
      console.log("success!")
    } catch (error) {
      console.log("error requesting pokemon", error)
      setSpinnerVariant("danger") // set spinner to red

      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }

    return requestedPokemon
  }

  return (
    <Container className="App bg-dark">
      <Container>
        <Navbar bg="light" variant="light" expand="lg">
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <RequestContext.Provider
        value={{
          playingAnimation,
          setPlayingAnimation,
          spinnerVariant,
          setSpinnerVariant,
          requestPokemon,
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
