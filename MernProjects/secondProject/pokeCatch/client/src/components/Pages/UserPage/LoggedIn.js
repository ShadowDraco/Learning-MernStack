import { useState, useContext, useEffect, createContext } from "react"
import { UserContext, RequestContext } from "../../../App"

import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"

import WelcomeMessage from "./WelcomeMessage"
import SaveUserButton from "../../UI/SaveUserButton"
import Bag from "../../Player/Bag"
import ChooseStarterPokemon from "../../Pokemon/ChooseStarterPokemon"
import Team from "../../Player/Team"
import Box from "../../Player/Box"
import CheatBar from "../../UI/CheatBar"
import PokemonStatCard from "../../Pokemon/PokemonStatCard"

export const PokemonStats = createContext()

export default function LoggedIn() {
  const { currentUser } = useContext(UserContext)
  const { playingAnimation, spinnerVariant } = useContext(RequestContext)

  const [displayingPokemonStats, setDisplayingPokemonStats] = useState(false)
  const [pokemonToDisplay, setPokemonToDisplay] = useState()

  useEffect(() => {
    // check if there is session storage for a player
    // if not then add session storage for this player
    let previousPlayer = JSON.parse(sessionStorage.getItem("PLAYER"))
    previousPlayer ? console.log("session storage exists") : saveUser()
  }, [])

  async function showPokemonStats(pokemon) {
    console.log("showing pokemon stats")
    setPokemonToDisplay(pokemon)
    setDisplayingPokemonStats(!displayingPokemonStats)
  }

  function saveUser() {
    // add the current user to the session storage of the browser
    sessionStorage.setItem("PLAYER", JSON.stringify(currentUser))
  }

  return (
    <Container className="m-0 pt-3 pb-3 flex-column">
      <WelcomeMessage />
      {!currentUser.choseStarterPokemon ? <ChooseStarterPokemon /> : ""}
      <hr className="text-light"></hr>

      <PokemonStats.Provider
        value={{
          setDisplayingPokemonStats,
          displayingPokemonStats,
          setPokemonToDisplay,
          showPokemonStats,
        }}
      >
        {displayingPokemonStats ? (
          <PokemonStatCard pokemon={pokemonToDisplay} />
        ) : (
          ""
        )}

        <Container className="flex flex-column align-left w-100">
          <Bag />
          <Team />
          <Box />
        </Container>
      </PokemonStats.Provider>

      {currentUser.username === "admin" ? <CheatBar /> : ""}

      <Container className="flex flex-center w-25 mt-4">
        <SaveUserButton />
      </Container>

      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
    </Container>
  )
}
