import { useState, useContext, useEffect } from "react"
import axios from "axios"

import { UserContext } from "../../App"
import { PokemonContext } from "../../App"
import "./ChooseStarterPokemon.css"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

export default function ChooseStarterPokemon() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { starterPokemon, setStarterPokemon } = useContext(PokemonContext)

  const [allStartersFetched, setAllStartersFetched] = useState(false)

  useEffect(() => {
    sessionStorage.getItem("STARTERS")
      ? fetchStarterPokemon()
      : getStarterPokemon()
  }, [])

  function fetchStarterPokemon() {
    setStarterPokemon(JSON.parse(sessionStorage.getItem("STARTERS")))
    console.log("fetched the starters")
    setAllStartersFetched(true)
  }

  async function getStarterPokemon() {
    console.log("getting starter pokemon!")

    const starters = ["charmander", "bulbasaur", "squirtle"]

    const pokemon = []

    for (const starter in starters) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${starters[starter]}`)
        .then(res => {
          console.log("got a starter pokemon!")

          let currentStarter = res.data

          // get the pokemon's genera
          axios.get(res.data.species.url).then(res => {
            currentStarter.genera = res.data.genera[7].genus
          })
          console.log(currentStarter.name)
          pokemon.push(currentStarter)
        })
    }
    pokemon.map(poke => {
      console.log(poke.name)
    })
    setStarterPokemon([...starterPokemon, pokemon])

    sessionStorage.setItem("STARTERS", JSON.stringify(pokemon))
    console.log("done getting starters")
    setAllStartersFetched(true)
  }

  // take the first letter to upper case then re-insert the rest of the string
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function choosePokemon(e) {
    console.log(e.target)

    const newPokemon = JSON.parse(e.target.pokemon)

    newPokemon.push({
      stats: [...e.target.pokemon.stats, { level: 5, xp: 0, xp_cap: 10 }],
    })

    console.log(newPokemon)

    axios
      .post("http://localhost:5000/user/add-pokemon-to-team", {
        user: currentUser,
        pokemon: newPokemon,
      })
      .then(res => {
        console.log(res.data)
        setCurrentUser(res.data.updatedUser)
      })
  }

  return allStartersFetched ? (
    <Container className="flex flex-column">
      <h1 className="text-light text-center bg-gray">
        Choose your starter Pokemon!
      </h1>
      <Container className="flex flex-center">
        {starterPokemon.map(pokemon => {
          return (
            <Card key={pokemon.name} className="starterPokemonCard">
              <Card.Img
                variant="top"
                src={`${pokemon.sprites.front_default}`}
                alt={`Front view of ${pokemon.name}`}
                pokemon={JSON.stringify(pokemon)}
                onClick={choosePokemon}
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
    </Container>
  ) : (
    ""
  )
}
