import "./DisplayPokemon.css"
import "../Player/Team.css"
import Capitalize from "../Utility"
import showPokemonStats from "../Utility"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import ProgressBar from "react-bootstrap/ProgressBar"

export default function PokemonCard(props) {
  return (
    <OverlayTrigger
      key={`${props.pokemon.name} ${props.pokemon.stats[6].id} tooltip`}
      placement="top"
      overlay={<Tooltip>{props.pokemon.genera}</Tooltip>}
    >
      <Card className="teamPokemonCard">
        <Card.Img
          variant="top"
          src={`${props.pokemon.sprites.front_default}`}
          alt={`Front view of ${props.pokemon.name}`}
          onClick={() => {
            showPokemonStats(props.pokemon)
          }}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{`${props.index}. ${Capitalize(
            props.pokemon.name
          )}`}</Card.Title>
          <Card.Text className="bg-dark text-secondary p-1">
            Level: {props.pokemon.stats[6].level} | Exp:{" "}
            {props.pokemon.stats[6].xp}
          </Card.Text>
          <ProgressBar
            variant="success"
            now={
              (props.pokemon.stats[6].max_hp / props.pokemon.stats[6].hp) * 100
            }
            label={`${props.pokemon.stats[6].hp} / ${props.pokemon.stats[6].max_hp}`}
          />
        </Card.Body>
      </Card>
    </OverlayTrigger>
  )
}
