import { useContext, useState } from "react"
import axios from "axios"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import { UserContext, RequestContext } from "../../App"

export default function AddPokemonButton() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { setPlayingAnimation, setSpinnerVariant, requestPokemon } =
    useContext(RequestContext)

  const [pokemonToAdd, setPokemonToAdd] = useState("")
  const [levelToAdd, setLevelToAdd] = useState(1)

  async function addPokemon() {
    setPlayingAnimation(true)
    setSpinnerVariant("success")

    let requestedPokemon = await requestPokemon(pokemonToAdd, levelToAdd)

    try {
      console.log("adding pokemon to box")

      await axios
        .post("http://localhost:5000/user/add-pokemon-to-box", {
          user: currentUser,
          pokemon: requestedPokemon,
        })
        .then(res => {
          console.log("finished add pokemon request")
          console.log(res.data)
          setCurrentUser(res.data.updatedUser)

          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error adding pokemon to box", error)
      setSpinnerVariant("danger") // set spinner to red

      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  function changePokemonToAdd(e) {
    setPokemonToAdd(e.target.value)
  }
  function changeLevelToAdd(e) {
    setLevelToAdd(parseInt(e.target.value))
  }

  return (
    <Container className="flex m-0  mt-1 w-auto">
      <input
        style={{ width: "3rem" }}
        value={levelToAdd}
        onChange={changeLevelToAdd}
        placeholder="Level:"
        type="number"
      ></input>
      <input
        style={{ width: "5rem" }}
        value={pokemonToAdd}
        onChange={changePokemonToAdd}
        placeholder="Pokemon:"
      ></input>
      <Button className="btn-sm btn-secondary" onClick={addPokemon}>
        Add Pokemon!
      </Button>
    </Container>
  )
}
