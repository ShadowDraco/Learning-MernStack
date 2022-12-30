import { useContext } from "react"

import { PokemonContext } from "../../App"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

export default function DisplayPokemon() {
  const { displayPokemon, displayGenera } = useContext(PokemonContext)

  // take the first letter to upper case then re-insert the rest of the string
  function Captialize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <Container className="flex flex-center m-3 p-3 bg-gray w-50">
      <Card className="bg-secondary">
        <Card.Img
          variant="top"
          src={`${displayPokemon.sprites.front_default}`}
          alt={`Front view of ${displayPokemon.name}`}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{`${displayPokemon.order}. ${Captialize(
            displayPokemon.name
          )}`}</Card.Title>
          <Card.Text className="bg-dark text-secondary p-1">
            The {displayGenera}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}
