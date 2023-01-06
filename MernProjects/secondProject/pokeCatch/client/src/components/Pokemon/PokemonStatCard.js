import { useContext } from "react"

import { UIContext } from "../Pages/UserPage/LoggedIn"
import capitalize from "../Utility/Capitlize"

import Card from "react-bootstrap/Card"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import ProgressBar from "react-bootstrap/ProgressBar"

export default function PokemonStatCard(props) {
  const { changePokemonStats } = useContext(UIContext)

  return (
    <OverlayTrigger
      key={`${props.pokemon.name} ${props.pokemon.stats[6].id} ${props.type} tooltip`}
      placement="top"
      overlay={<Tooltip>{props.pokemon.genera}</Tooltip>}
    >
      <Card
        className="statsPokemonCard"
        onClick={() => {
          changePokemonStats(props.pokemon)
        }}
      >
        <Card.Img
          variant="top"
          src={`${props.pokemon.sprites.front_default}`}
          alt={`Front view of ${props.pokemon.name}`}
        ></Card.Img>
        <Card.Body>
          <Card.Title>
            {`${props.pokemon.order}. ${capitalize(props.pokemon.name)}`}
            <br></br>
            {props.pokemon.nickname
              ? capitalize(props.pokemon.nickname)
              : capitalize(props.pokemon.name)}
          </Card.Title>
          <Card.Text className="bg-dark text-secondary p-1">
            {`Level: ${props.pokemon.stats[6].level} | Exp: ${props.pokemon.stats[6].xp}`}
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
