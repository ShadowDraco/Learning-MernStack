import { useState, useContext, useEffect } from "react"
import axios from "axios"

import { UserContext } from "../../App"
import { PokemonContext } from "../../App"
import "./ChooseStarterPokemon.css"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Spinner from "react-bootstrap/Spinner"

export default function ChooseStarterPokemon() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { starterPokemon, setStarterPokemon } = useContext(PokemonContext)

  const [playingAnimation, setPlayingAnimation] = useState(false)
  const [spinnerVariant, setSpinnerVariant] = useState("success")

  const [allStartersFetched, setAllStartersFetched] = useState(false)

  useEffect(() => {
    sessionStorage.getItem("STARTERS")
      ? fetchStarterPokemon()
      : getStarterPokemon()
  }, [])

  async function fetchStarterPokemon() {
    await setStarterPokemon(JSON.parse(sessionStorage.getItem("STARTERS")))
    console.log("fetched the starters")
    setAllStartersFetched(true)
  }

  async function getStarterPokemon() {
    console.log("getting starter pokemon!")

    const starters = ["charmander", "bulbasaur", "squirtle"]

    const pokemon = []
    let currentStarter
    setPlayingAnimation(true)
    setSpinnerVariant("success")

    for (const starter in starters) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${starters[starter]}`)
        .then(res => {
          currentStarter = res.data
        })
      // get the pokemon's genera
      await axios.get(currentStarter.species.url).then(res => {
        currentStarter.genera = res.data.genera[7].genus
        pokemon.push(currentStarter)
      })
    }

    await setStarterPokemon([...starterPokemon, pokemon])

    sessionStorage.setItem("STARTERS", JSON.stringify(pokemon))
    console.log("done getting starters")
    setAllStartersFetched(true)
    setPlayingAnimation(false)
  }

  // take the first letter to upper case then re-insert the rest of the string
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  async function choosePokemon(i) {
    const newPokemon = starterPokemon[i]

    const hp = newPokemon.stats[0].base_stat
    const attack = newPokemon.stats[1].base_stat
    const defense = newPokemon.stats[2].base_stat
    const special_attack = newPokemon.stats[3].base_stat
    const special_defense = newPokemon.stats[4].base_stat
    const speed = newPokemon.stats[5].base_stat

    setPlayingAnimation(true)
    setSpinnerVariant("success")
    newPokemon.stats.push({
      level: 5,
      xp: 0,
      xp_cap: 10,
      max_hp: hp,
      hp: hp,
      attack: attack,
      defense: defense,
      special_attack: special_attack,
      special_defense: special_defense,
      speed: speed,
    })
    newPokemon.isStarter = true
    newPokemon.isInTeam = true

    await axios
      .post("http://localhost:5000/user/add-pokemon-to-team", {
        user: currentUser,
        pokemon: newPokemon,
      })
      .then(res => {
        console.log(res.data)
        setCurrentUser(res.data.updatedUser)
      })
    setPlayingAnimation(false)
  }

  return allStartersFetched ? (
    <Container className="flex flex-column">
      <h1 className="text-light text-center bg-gray">
        Choose your starter Pokemon!
      </h1>
      <Container className="flex flex-center">
        {starterPokemon.map((pokemon, i) => {
          return (
            <Card key={pokemon.name} className="starterPokemonCard">
              <Card.Img
                variant="top"
                src={`${pokemon.sprites.front_default}`}
                alt={`Front view of ${pokemon.name}`}
                onClick={() => {
                  choosePokemon(i)
                }}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{`${pokemon.order}. ${Capitalize(
                  pokemon.name
                )}`}</Card.Title>
                <Card.Text className="bg-dark text-secondary p-1">
                  The {pokemon.genera}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </Container>
      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
    </Container>
  ) : (
    ""
  )
}
