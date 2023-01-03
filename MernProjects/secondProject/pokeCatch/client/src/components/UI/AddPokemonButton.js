import { useContext, useState } from "react"
import axios from "axios"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { UserContext } from "../../App"

export default function AddPokemonButton() {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [playingAnimation, setPlayingAnimation] = useState(false)
  const [spinnerVariant, setSpinnerVariant] = useState("success")

  const [pokemonToAdd, setPokemonToAdd] = useState("")
  const [levelToAdd, setLevelToAdd] = useState(1)

  async function addPokemon() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    try {
      console.log("adding pokemon to box")
      setSpinnerVariant("success") // change spinner to green

      let requestedPokemon
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonToAdd}`)
        .then(res => {
          requestedPokemon = res.data
          const hp = requestedPokemon.stats[0].base_stat
          const max_hp =
            hp *
            Math.floor(
              (Math.random(3) * 100 + levelToAdd) * (levelToAdd / attack)
            )
          const attack = requestedPokemon.stats[1].base_stat
          const defense = requestedPokemon.stats[2].base_stat
          const special_attack = requestedPokemon.stats[3].base_stat
          const special_defense = requestedPokemon.stats[4].base_stat
          const speed = requestedPokemon.stats[5].base_stat

          setPlayingAnimation(true)
          setSpinnerVariant("success")
          requestedPokemon.stats.push({
            level: levelToAdd,
            xp: 0,
            xp_cap: (10 * levelToAdd) / 5,
            max_hp: max_hp,
            hp: max_hp,
            attack:
              attack *
              Math.floor(
                (Math.random(3) * 100 + levelToAdd) * (levelToAdd / attack)
              ),
            defense:
              defense *
              Math.floor(
                (Math.random(3) * 100 + levelToAdd) * (levelToAdd / defense)
              ),
            special_attack:
              special_attack *
              Math.floor(
                (Math.random(3) * 100 + levelToAdd) *
                  (levelToAdd / special_attack)
              ),
            special_defense:
              special_defense *
              Math.floor(
                (Math.random(3) * 100 + levelToAdd) *
                  (levelToAdd / special_defense)
              ),
            speed:
              speed *
              Math.floor(
                (Math.random(3) * 100 + levelToAdd) * (levelToAdd / speed)
              ),
          })
          requestedPokemon.isStarter = false
          requestedPokemon.isInTeam = false
        })

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
      console.log("error requesting pokemon")
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
    <Container className="flex">
      <input
        style={{ width: "4rem" }}
        value={levelToAdd}
        onChange={changeLevelToAdd}
        placeholder="Level:"
        type="number"
      ></input>
      <input
        style={{ width: "6rem" }}
        value={pokemonToAdd}
        onChange={changePokemonToAdd}
        placeholder="Pokemon:"
      ></input>
      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
      <Button className="btn-sm btn-secondary" onClick={addPokemon}>
        Add Pokemon!
      </Button>
    </Container>
  )
}
