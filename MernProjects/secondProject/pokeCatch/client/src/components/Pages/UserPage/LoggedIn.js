import { useContext, useEffect } from "react"
import { UserContext } from "../../../App"

import Container from "react-bootstrap/Container"
//import Button from "react-bootstrap/Button"

export default function LoggedIn() {
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    // check if there is session storage for a player
    // if not then add session storage
    let previousPlayer = JSON.parse(sessionStorage.getItem("PLAYER"))
    previousPlayer ? console.log("session storage exists") : saveUser()
  }, [])

  function saveUser() {
    // add the current user to the session storage of the browser
    sessionStorage.setItem("PLAYER", JSON.stringify(currentUser))
  }

  return (
    <Container className="mt-0 p-3">
      <h1 className="text-light text-center">Welcome {currentUser.username}</h1>
    </Container>
  )
}
