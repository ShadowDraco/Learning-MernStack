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
import CanvasManager from "./GameManager"
import axios from "axios"

export const UIContext = createContext()

export default function LoggedIn() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { playingAnimation, spinnerVariant } = useContext(RequestContext)

  // UI changes and variables
  const [bagOpen, setBagOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const [boxOpen, setBoxOpen] = useState(false)
  const [pokemonStatsOpen, setPokemonStatsOpen] = useState(false)
  const [pokemonStats, setPokemonStats] = useState()
  const [canvasReady, setCanvasReady] = useState(true)

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
    previousPlayer ? saveUser() : addPlayer()
  }, [])

  function changePokemonStats(pokemon) {
    console.log("showing pokemon stats")

    pokemon === pokemonStats
      ? setPokemonStatsOpen(!pokemonStatsOpen)
      : setPokemonStats(pokemon)
  }

  function addPlayer() {
    // add a player to current session storage
    sessionStorage.setItem("PLAYER", JSON.stringify(currentUser))
    console.log("added player to session storage")
  }

  async function saveUser() {
    // request an update from the server
    // add the current user to the session storage of the browser
    console.log("saving user")
    await axios
      .post("http://localhost:5000/user/update", { user: currentUser })
      .then(res => {
        sessionStorage.setItem("PLAYER", JSON.stringify(res.data.updatedUser))
        setCurrentUser(res.data.updatedUser)
        setCanvasReady(true)
      })
    console.log("finished saving")
  }

  return (
    <Container className="flex flex-column flex-center pt-3 pb-3">
      <WelcomeMessage />

      <Container className="flex flex-center flex-column">
        <Container className="flex justify-content-evenly">
          <Button onClick={changeBagOpen}>Bag</Button>
          <Button onClick={changeTeamOpen}>Team</Button>
          <Button onClick={changeBoxOpen}>Box</Button>
          <SaveUserButton />
        </Container>

        {canvasReady ? (
          <Container className="flex flex-center mt-3">
            <CanvasManager />
          </Container>
        ) : (
          ""
        )}

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
          }}
        >
          {!currentUser.choseStarterPokemon ? <ChooseStarterPokemon /> : ""}
          <hr className="text-light"></hr>

          <Bag />
          <Team />
          <Box />
          {pokemonStats ? <PokeStats pokemon={pokemonStats} /> : ""}
        </UIContext.Provider>
      </Container>

      {currentUser.username === "admin" ? <CheatBar /> : ""}

      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
    </Container>
  )
}
