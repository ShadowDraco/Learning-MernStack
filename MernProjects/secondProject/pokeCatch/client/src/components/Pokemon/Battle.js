import React, { useContext } from "react"
import { UserContext } from "../../App"
import axios from "axios"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import PokemonCard from "./PokemonCard"

import { RequestContext } from "../../App"
import { EncounterContext } from "../Pages/UserPage/GameManager"

export default function Battle() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { encounteredPokemon, setEncounteredPokemon, setPokemonEncountered } =
    useContext(EncounterContext)
  const { setPlayingAnimation, setSpinnerVariant } = useContext(RequestContext)

  async function attackWildPokemon() {
    let damageDone =
      Math.floor(Math.random(encounteredPokemon.stats[6].attack / 2) * 10) +
      encounteredPokemon.stats[6].attack / 2

    let newPokemon = encounteredPokemon
    newPokemon.stats[6].hp -= damageDone
    await setEncounteredPokemon(newPokemon)
    newPokemon.stats[6].hp < 1 ? await defeatEncounter() : console.log()
  }

  async function updateAfterBattle(user) {
    // add the current user to the session storage of the browser

    try {
      console.log("updating pokemon")
      setPlayingAnimation(true)
      setSpinnerVariant("success") // change spinner to green

      await axios
        .post("http://localhost:5000/user/update-after-battle", {
          user: user,
          pokemon: user.team[1],
        })
        .then(res => {
          console.log("updated pokemon")
          setCurrentUser(res.data.updatedUser)

          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error while updating", error)
      setSpinnerVariant("danger") // set spinner to red
      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  async function levelUpPokemon(user) {
    let pokemon = user.team[1]
    let newStats = pokemon.stats[6]
    let stats = pokemon.stats[6]

    newStats.level += 1
    newStats.xp -= stats.xp_cap
    newStats.xp_cap += 10
    newStats.max_hp += Math.floor(Math.random(10) * 10) + 1
    newStats.hp = stats.max_hp
    newStats.attack += Math.floor(Math.random(2) * 10) + 1
    newStats.defense += Math.floor(Math.random(3) * 10) + 1
    newStats.special_attack += Math.floor(Math.random(2) * 10) + 1
    newStats.special_defense += Math.floor(Math.random(2) * 10) + 1
    newStats.speed += Math.floor(Math.random(3) * 10) + 1

    pokemon.stats[6] = newStats
    user.team[1] = pokemon

    setCurrentUser(user)
  }

  async function defeatEncounter() {
    let user = currentUser

    user.team[1].stats[6].xp +=
      Math.floor(Math.random(encounteredPokemon.stats[6].level) * 10) + 1

    user.team[1].stats[6].xp >= user.team[1].stats[6].xp_cap
      ? await levelUpPokemon(user)
      : console.log()

    setEncounteredPokemon(null)
    setPokemonEncountered(false)
    await updateAfterBattle(user)
  }

  async function catchPokemon() {
    try {
      console.log("catching pokemon")
      setPlayingAnimation(true)
      setSpinnerVariant("success") // change spinner to green

      await axios
        .post("http://localhost:5000/user/catch-pokemon", {
          user: currentUser,
          pokemon: encounteredPokemon,
        })
        .then(res => {
          console.log("Caught Pokemon")
          setCurrentUser(res.data.updatedUser)

          setPlayingAnimation(false)
          setEncounteredPokemon(null)
          setPokemonEncountered(false)
        })
    } catch (error) {
      console.log("error while catching pokemon", error)
      setSpinnerVariant("danger") // set spinner to red
      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Container className="flex flex-center">
      <PokemonCard pokemon={currentUser.team[1]} index={1} type="team" />
      <span className="mx-5"></span>
      <PokemonCard
        pokemon={encounteredPokemon}
        index={encounteredPokemon.order}
        type="battle"
        onClick={() => {
          attackWildPokemon()
        }}
      />
      <Button className="btn-warning" onClick={catchPokemon}>
        Poke-ball
      </Button>
    </Container>
  )
}
