import { useContext, useEffect } from "react"
import { UserContext } from "../../../App"

import Container from "react-bootstrap/Container"

import WelcomeMessage from "./WelcomeMessage"
import SaveUserButton from "../../UI/SaveUserButton"
import AddItemButton from "../../UI/AddItemButton"
import Bag from "../../Player/Bag"
import ChooseStarterPokemon from "../../Player/ChooseStarterPokemon"

export default function LoggedIn() {
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    // check if there is session storage for a player
    // if not then add session storage for this player
    let previousPlayer = JSON.parse(sessionStorage.getItem("PLAYER"))
    previousPlayer ? console.log("session storage exists") : saveUser()
  }, [])

  useEffect(() => {
    console.log("user has been updated")
  }, [currentUser])

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
      <AddItemButton />
      <Container className="flex flex-center w-25">
        <SaveUserButton />
      </Container>
    </Container>
  )
}
