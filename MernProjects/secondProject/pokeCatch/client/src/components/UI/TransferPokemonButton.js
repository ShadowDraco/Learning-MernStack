import axios from "axios"
import { useContext } from "react"

import { UserContext, RequestContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import Button from "react-bootstrap/Button"

export default function TransferPokemonButton(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { closePokemonStats } = useContext(UIContext)

  const { setPlayingAnimation, setSpinnerVariant } = useContext(RequestContext)

  async function transferPokemon() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    try {
      closePokemonStats()
      console.log("transfering pokemon")
      setPlayingAnimation(true)
      setSpinnerVariant("success") // change spinner to green

      let pokemon = props.pokemon
      let team = currentUser.team
      let box = currentUser.box

      if (pokemon.isInTeam) {
        for (let i = 0; i < team.length; i++) {
          if (team[i] === pokemon) {
            team.splice(i, 1)
          }
        }
        pokemon.isInTeam = false
        box.push(pokemon)
      } else {
        for (let i = 0; i < box.length; i++) {
          if (box[i] === pokemon) {
            box.splice(i, 1)
          }
        }
        pokemon.isInTeam = true
        team.push(pokemon)
      }

      console.log("transfered")

      await axios
        .post("http://localhost:5000/user/updateUser", { user: currentUser })
        .then(res => {
          console.log("updated user with database")
          console.log(res.data)
          setCurrentUser(res.data.updatedUser)

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
