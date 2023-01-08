import axios from "axios"
import { useContext } from "react"

import { UserContext, RequestContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import Button from "react-bootstrap/Button"

export default function TransferPokemonButton(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { changePokemonStats } = useContext(UIContext)

  const { setPlayingAnimation, setSpinnerVariant } = useContext(RequestContext)

  async function transferPokemon() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    let user = currentUser
    try {
      changePokemonStats(props.pokemon)
      console.log("transfering pokemon")
      setPlayingAnimation(true)
      setSpinnerVariant("sauccess") // change spinner to green

      await axios
        .post("http://localhost:5000/user/transfer-user-pokemon", {
          user: user,
          pokemon: props.pokemon,
          isInTeam: props.pokemon.isInTeam,
        })
        .then(res => {
          console.log("transfered pokemon")
          setCurrentUser(res.data.updatedUser)
          console.log(res.data.status)

          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error while transfering", error)
      setSpinnerVariant("danger") // set spinner to red
      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Button className="btn-info" onClick={transferPokemon}>
      Transfer
    </Button>
  )
}
