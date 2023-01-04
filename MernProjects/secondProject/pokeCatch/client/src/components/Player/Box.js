import { useContext, useState } from "react"
import { UserContext } from "../../App"

import PokemonCard from "../Pokemon/PokemonCard"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

export default function Box() {
  const { currentUser } = useContext(UserContext)

  const [boxOpen, setBoxOpen] = useState(false)

  function changeBoxOpen(e) {
    setBoxOpen(!boxOpen)
  }

  function showPokemonStats(pokemon) {
    console.log("showing stats for", pokemon)
  }

  return (
    <Container className="flex">
      <Button onClick={changeBoxOpen}>
        {boxOpen ? "Close Box" : "Open Box"}
      </Button>
      <Container className="box">
        {boxOpen
          ? currentUser.box.map((poke, i) => {
              return i > 0 ? (
                <PokemonCard pokemon={poke} index={i} type="box" />
              ) : (
                ""
              )
            })
          : ""}
      </Container>
    </Container>
  )
}
