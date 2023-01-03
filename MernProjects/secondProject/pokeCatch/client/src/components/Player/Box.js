import { useContext, useState } from "react"
import { UserContext } from "../../App"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import "./Box.css"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import ProgressBar from "react-bootstrap/ProgressBar"

export default function Box() {
  const { currentUser } = useContext(UserContext)

  const [boxOpen, setBoxOpen] = useState(false)

  function changeBoxOpen(e) {
    setBoxOpen(!boxOpen)
  }

  // take the first letter to upper case then re-insert the rest of the string
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
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
                <OverlayTrigger
                  key={`${poke.name} ${poke.stats[6].id} tooltip`}
                  placement="top"
                  overlay={<Tooltip>{poke.genera}</Tooltip>}
                >
                  <Card className="boxPokemonCard">
                    <Card.Img
                      variant="top"
                      src={`${poke.sprites.front_default}`}
                      alt={`Front view of ${poke.name}`}
                      onClick={() => {
                        showPokemonStats(poke)
                      }}
                    ></Card.Img>
                    <Card.Body>
                      <Card.Title>{`${i}. ${Capitalize(
                        poke.name
                      )}`}</Card.Title>
                      <Card.Text className="bg-dark text-secondary p-1">
                        Level: {poke.stats[6].level}
                      </Card.Text>
                      <ProgressBar
                        variant="success"
                        now={(poke.stats[6].max_hp / poke.stats[6].hp) * 100}
                        label={`${poke.stats[6].hp} / ${poke.stats[6].max_hp}`}
                      />
                    </Card.Body>
                  </Card>
                </OverlayTrigger>
              ) : (
                ""
              )
            })
          : ""}
      </Container>
    </Container>
  )
}
