import { useState, useContext, useEffect } from "react"
import { UserContext, PokemonContext, RequestContext } from "../../../App"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import Greeting from "./Greeting"
import LoginMessage from "./LoginMessage"
import DisplayPokemon from "../../Pokemon/DisplayPokemon"

export default function SignInPage() {
  const { setCurrentUser, setUserLoggedIn } = useContext(UserContext)
  const { displayPokemon } = useContext(PokemonContext)
  const { playingAnimation, spinnerVariant } = useContext(RequestContext)

  const [signingUp, setSigningUp] = useState(true)

  const [canRestorePreviousSession, setCanRestorePreviousSession] =
    useState(false)
  const [previousSessionPlayer, setPreviousSessionPlayer] = useState()

  useEffect(() => {
    // check if there is session storage for a player
    // if not then add session storage
    let previousPlayer = JSON.parse(sessionStorage.getItem("PLAYER"))
    previousPlayer
      ? readyPreviousSession(previousPlayer)
      : console.log("no previous session")
  }, [])

  function readyPreviousSession(previousPlayer) {
    setCanRestorePreviousSession(true)
    setPreviousSessionPlayer(previousPlayer)
    console.log("prepared previous session player")
  }

  function confirmSessionRestore() {
    console.log("restoring previous session!")
    setCurrentUser(previousSessionPlayer)
    setUserLoggedIn(true)
  }

  function changeSigningUp(e) {
    setSigningUp(!signingUp)
  }

  return (
    <Container className="SignIn bg-dark flex flex-column flex-center p-3">
      <h1 className="text-light bg-gray p-3"> Welcome to Poke Catch! </h1>
      <Container className="Forms bg-dark p-1 w-50">
        {signingUp ? <Greeting /> : <LoginMessage />}

        {signingUp ? <SignupForm /> : <LoginForm />}
        {playingAnimation ? (
          <Spinner animation="grow" variant={spinnerVariant} />
        ) : (
          ""
        )}
      </Container>
      {/* One time per session grab a random pokemon and display it! */}
      {displayPokemon ? <DisplayPokemon /> : ""}
      {/* Change between log in and sign up */}
      <Button
        className="btn-lg bg-gray text-info loginSignupButton"
        onClick={changeSigningUp}
      >
        {signingUp ? "Log in?" : " Sign up?"}
      </Button>

      {/*if there is a previous session allow users to restore it */}
      {canRestorePreviousSession ? (
        <Container className="flex flex-center border border-warning mt-3">
          <h3 className="text-info text-center m-3">
            Would you like to continue where you left off?
          </h3>
          <Button onClick={confirmSessionRestore}>Continue!</Button>
        </Container>
      ) : (
        ""
      )}
    </Container>
  )
}
