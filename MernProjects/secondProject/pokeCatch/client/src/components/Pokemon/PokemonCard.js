import { useContext } from "react"

import { UIContext } from "../Pages/UserPage/LoggedIn"
import capitalize from "../Utility/Capitlize"

import Card from "react-bootstrap/Card"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import ProgressBar from "react-bootstrap/ProgressBar"

export default function PokemonCard(props) {
  const { changePokemonStats } = useContext(UIContext)

  return (
    <OverlayTrigger
      key={
        props.type === "starter"
          ? `${props.pokemon.name} ${props.type} tooltip`
          : `${props.pokemon.name} ${props.pokemon.stats[6].id} ${props.type} tooltip`
      }
      placement="top"
      overlay={<Tooltip>{props.pokemon.genera}</Tooltip>}
    >
      <Card
        className={`${props.type}PokemonCard pokemon-card`}
        onClick={() => {
          {
            props.type !== "starter"
              ? changePokemonStats(props.pokemon)
              : console.log("cannot show stats for this pokemon")
          }
        }}
      >
        <Card.Img
          variant="top"
          src={`${props.pokemon.sprites.front_default}`}
          alt={`Front view of ${props.pokemon.name}`}
          className="card-img"
        ></Card.Img>
        <Card.Body>
          <Card.Title>
            {props.type !== "starter"
              ? `${props.index}`
              : `${props.pokemon.order}`}
            . {capitalize(props.pokemon.name)}
          </Card.Title>
          <Card.Text className="bg-dark text-secondary p-1">
            {props.type !== "starter"
              ? `Level: ${props.pokemon.stats[6].level}`
              : ""}
            {props.type === "starter" ? `${props.pokemon.genera}` : ""}
          </Card.Text>
          {props.type === "box" || props.type === "team" ? (
            <ProgressBar
              variant="success"
              now={
                (props.pokemon.stats[6].max_hp / props.pokemon.stats[6].hp) *
                100
              }
              label={`${props.pokemon.stats[6].hp} / ${props.pokemon.stats[6].max_hp}`}
            />
          ) : (
            ""
          )}
          {props.type === "team" ? (
            <ProgressBar
              variant="primary"
              now={
                (props.pokemon.stats[6].xp_cap / props.pokemon.stats[6].xp) *
                100
              }
              label={`${props.pokemon.stats[6].xp} / ${props.pokemon.stats[6].xp_cap}`}
            />
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </OverlayTrigger>
  )
}
