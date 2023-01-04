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

  return (
    <Container className="flex flex-column">
      <Button onClick={changeBoxOpen}>
        {boxOpen ? "Close Box" : "Open Box"}
      </Button>
      <Container className=" flex flex-wrap">
        {boxOpen
          ? currentUser.box.map((poke, i) => {
              return i > 0 ? (
                <PokemonCard
                  key={i}
                  pokemon={poke}
                  index={i}
                  type="box"
                />
              ) : (
                ""
              )
            })
          : ""}
      </Container>
    </Container>
  )
}
