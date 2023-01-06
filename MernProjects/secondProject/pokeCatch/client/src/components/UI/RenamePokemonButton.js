import axios from "axios"
import { useContext, useState } from "react"

import { UserContext, RequestContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

export default function RenamePokemonButton(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { changePokemonStats } = useContext(UIContext)

  const { setPlayingAnimation, setSpinnerVariant } = useContext(RequestContext)

  const [newNickname, setNewNickname] = useState("")

  function changeNewNickname(e) {
    setNewNickname(e.target.value)
  }

  async function renamePokemon() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    let user = currentUser
    try {
      changePokemonStats(props.pokemon)
      console.log("renaming pokemon")
      setPlayingAnimation(true)
      setSpinnerVariant("success") // change spinner to green

      let pokemon = props.pokemon
      let team = user.team
      let box = user.box

      if (pokemon.isInTeam) {
        for (let i = 0; i < team.length; i++) {
          if (team[i] === pokemon) {
            team[i].nickname = newNickname
          }
        }
      } else {
        for (let i = 0; i < box.length; i++) {
          if (box[i] === pokemon) {
            box[i].nickname = newNickname
          }
        }
      }

      console.log("renamed")

      await axios
        .post("http://localhost:5000/user/update-user-pokemon", {
          user: user,
        })
        .then(res => {
          console.log("updated user with database")
          setCurrentUser(res.data.updatedUser)

          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error while renaming", error)
      setSpinnerVariant("danger") // set spinner to red
      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Dropdown className="flex justify-content-end">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Rename
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Container className="flex flex-column ps-2">
          <label htmlFor="nickname">New Nickname:</label>
          <input value={newNickname} onChange={changeNewNickname}></input>

          <Button className="btn-info" onClick={renamePokemon}>
            Submit
          </Button>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  )
}
