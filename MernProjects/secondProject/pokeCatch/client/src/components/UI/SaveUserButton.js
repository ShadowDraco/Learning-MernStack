import { useContext, useState } from "react"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { UserContext } from "../../App"

export default function SaveUserButton() {
  const { currentUser } = useContext(UserContext)

  const [playingAnimation, setPlayingAnimation] = useState(false)
  const [spinnerVariant, setSpinnerVariant] = useState("success")

  async function saveUser() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    try {
      console.log("saving user")
      setSpinnerVariant("success") // change spinner to green
      sessionStorage.setItem("PLAYER", JSON.stringify(currentUser))
      // allow the spinner to go for 1 second then turn off
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 1000)
    } catch (error) {
      console.log("error while saving")
      setSpinnerVariant("danger") // set spinner to red
      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Container className="flex">
      <Button className="btn-info" onClick={saveUser}>
        Save Game!
      </Button>
      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
    </Container>
  )
}
