import { useContext, useState } from "react"
import axios from "axios"

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

      await axios
        .post("http://localhost:5000/user/rename-user-pokemon", {
          user: user,
          pokemon: props.pokemon,
          isInTeam: props.pokemon.isInTeam,
          newNickname: newNickname,
        })
        .then(res => {
          console.log("renamed pokemon")
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
    <Dropdown className="flex flex-center">
      <Dropdown.Toggle variant="info" id="dropdown-basic" className="w-100">
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
