import { useState, useContext, useEffect, createContext } from "react"
import { UserContext, RequestContext } from "../../../App"

import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"

import WelcomeMessage from "./WelcomeMessage"
import SaveUserButton from "../../UI/SaveUserButton"
import Bag from "../../Player/Bag"
import ChooseStarterPokemon from "../../Pokemon/ChooseStarterPokemon"
import Team from "../../Player/Team"
import Box from "../../Player/Box"
import CheatBar from "../../UI/CheatBar"
import PokeStats from "../../Pokemon/PokeStats"

export const UIContext = createContext()

export default function LoggedIn() {
  const { currentUser } = useContext(UserContext)
  const { playingAnimation, spinnerVariant } = useContext(RequestContext)

  // UI changes and variables
  const [bagOpen, setBagOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const [boxOpen, setBoxOpen] = useState(false)
  const [pokemonStatsOpen, setPokemonStatsOpen] = useState(false)
  const [pokemonStats, setPokemonStats] = useState()

  function changeBoxOpen(e) {
    setBoxOpen(!boxOpen)
  }

  function changeTeamOpen(e) {
    setTeamOpen(!teamOpen)
  }

  function changeBagOpen(e) {
    setBagOpen(!bagOpen)
  }

  useEffect(() => {
    // check if there is session storage for a player
    // if not then add session storage for this player
    let previousPlayer = JSON.parse(sessionStorage.getItem("PLAYER"))
    previousPlayer ? console.log("session storage exists") : saveUser()
  }, [])

  function changePokemonStats(pokemon) {
    console.log("showing pokemon stats")

    pokemon === pokemonStats
      ? setPokemonStatsOpen(!pokemonStatsOpen)
      : setPokemonStats(pokemon)
  }

  function closePokemonStats() {
    setPokemonStatsOpen(false)
    setBoxOpen(false)
    setTeamOpen(false)
  }

  function saveUser() {
    // add the current user to the session storage of the browser
    sessionStorage.setItem("PLAYER", JSON.stringify(currentUser))
  }

  return (
    <Container className="flex flex-column flex-center pt-3 pb-3">
      <WelcomeMessage />
      {!currentUser.choseStarterPokemon ? <ChooseStarterPokemon /> : ""}
      <hr className="text-light"></hr>

      <Container className="flex flex-center w-100">
        <Button onClick={changeBagOpen}>Bag</Button>
        <Button onClick={changeTeamOpen}>Team</Button>
        <Button onClick={changeBoxOpen}>Box</Button>
        <SaveUserButton />

        {currentUser.username === "admin" ? <CheatBar /> : ""}

        <UIContext.Provider
          value={{
            bagOpen,
            changeBagOpen,
            teamOpen,
            changeTeamOpen,
            boxOpen,
            changeBoxOpen,
            pokemonStats,
            pokemonStatsOpen,
            changePokemonStats,
            closePokemonStats,
          }}
        >
          <Bag />
          <Team />
          <Box />
          {pokemonStats ? <PokeStats pokemon={pokemonStats} /> : ""}
        </UIContext.Provider>
      </Container>

      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
    </Container>
  )
}
