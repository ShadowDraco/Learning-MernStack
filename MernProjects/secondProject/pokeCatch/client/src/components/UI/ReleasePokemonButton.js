import axios from "axios"
import { useContext, useState } from "react"

import { UserContext, RequestContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

export default function ReleasePokemonButton(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { changePokemonStats } = useContext(UIContext)

  const { setPlayingAnimation, setSpinnerVariant } = useContext(RequestContext)

  const [areYouSure, setAreYouSure] = useState(false)

  function changeAreYouSure(e) {
    setAreYouSure(!areYouSure)
  }

  async function releasePokemon() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    let user = currentUser
    try {
      changePokemonStats(props.pokemon)
      console.log("releasing pokemon")
      setPlayingAnimation(true)
      setSpinnerVariant("sauccess") // change spinner to green

      await axios
        .post("http://localhost:5000/user/release-user-pokemon", {
          user: user,
          pokemon: props.pokemon,
          isInTeam: props.pokemon.isInTeam,
        })
        .then(res => {
          console.log("released pokemon")
          setCurrentUser(res.data.updatedUser)
          console.log(res.data.status)

          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error while releasing", error)
      setSpinnerVariant("danger") // set spinner to red
      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Container className="flex flex-column">
      <Button className="btn-info w-100" onClick={changeAreYouSure}>
        Release
      </Button>
      {areYouSure ? (
        <Container className="flex flex-center justify-content-evenly">
          <Button className="btn-danger" onClick={releasePokemon}>
            Yes
          </Button>
          <Button className="btn-success" onClick={changeAreYouSure}>
            No Keep It!
          </Button>
        </Container>
      ) : (
        ""
      )}
    </Container>
  )
}
