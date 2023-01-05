import { useContext } from "react"

import { PokemonContext } from "../../App"
import "./PokemonCard.css"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

export default function DisplayPokemon() {
  const { displayPokemon, displayGenera, getDisplayPokemon } =
    useContext(PokemonContext)

  // take the first letter to upper case then re-insert the rest of the string
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <Container className=" flex flex-center flex-column mt-3 mb-3 bg-dark">
      <h5 className="text-light"> Preview your future discoveries! </h5>
      <Card className="displayPokemonCard pokemon-card w-50">
        <Card.Img
          variant="top"
          src={`${displayPokemon.sprites.front_default}`}
          alt={`Front view of ${displayPokemon.name}`}
          onClick={getDisplayPokemon}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{`${displayPokemon.order}. ${Capitalize(
            displayPokemon.name
          )}`}</Card.Title>
          <Card.Text className="bg-dark text-secondary">
            The {displayGenera}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}
