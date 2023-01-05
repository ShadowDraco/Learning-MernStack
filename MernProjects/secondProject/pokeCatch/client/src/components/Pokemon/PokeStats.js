import { useContext } from "react"
import { UserContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import PokemonStatCard from "./PokemonStatCard"

import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"
import TransferPokemonButton from "../UI/TransferPokemonButton"

export default function PokeStats(props) {
  const { currentUser } = useContext(UserContext)
  const { pokemonStatsOpen, changePokemonStats } = useContext(UIContext)

  return (
    <Offcanvas
      show={pokemonStatsOpen}
      onHide={() => {
        changePokemonStats(props.pokemon)
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {`${currentUser.username}'s ${props.pokemon.name}`}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container className="flex">
          <PokemonStatCard pokemon={props.pokemon} />
          <Container className="flex flex-column">
            <TransferPokemonButton pokemon={props.pokemon} />
          </Container>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
