import { useContext, useEffect } from "react"
import { UserContext, RequestContext } from "../../../App"

import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"

import WelcomeMessage from "./WelcomeMessage"
import SaveUserButton from "../../UI/SaveUserButton"
import AddItemButton from "../../UI/AddItemButton"
import Bag from "../../Player/Bag"
import ChooseStarterPokemon from "../../Player/ChooseStarterPokemon"
import Team from "../../Player/Team"
import AddPokemonButton from "../../UI/AddPokemonButton"
import Box from "../../Player/Box"

export default function LoggedIn() {
  const { currentUser } = useContext(UserContext)
  const { playingAnimation, spinnerVariant } = useContext(RequestContext)

  useEffect(() => {
    // check if there is session storage for a player
    // if not then add session storage for this player
    let previousPlayer = JSON.parse(sessionStorage.getItem("PLAYER"))
    previousPlayer ? console.log("session storage exists") : saveUser()
  }, [])

  function saveUser() {
    // add the current user to the session storage of the browser
    sessionStorage.setItem("PLAYER", JSON.stringify(currentUser))
  }

  return (
    <Container className="mt-0 p-3 flex flex-column">
      <WelcomeMessage />
      {!currentUser.choseStarterPokemon ? <ChooseStarterPokemon /> : ""}
      <hr className="text-light"></hr>
      <Bag />
      <Team />
      <Box />
      {currentUser.username === "admin" ? <AddItemButton /> : ""}
      {currentUser.username === "admin" ? <AddPokemonButton /> : ""}

      <Container className="flex flex-center w-25">
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
