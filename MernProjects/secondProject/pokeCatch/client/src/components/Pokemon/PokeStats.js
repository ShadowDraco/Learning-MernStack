import { useContext } from "react"
import { UserContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import PokemonStatCard from "./PokemonStatCard"

import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import TransferPokemonButton from "../UI/TransferPokemonButton"
import RenamePokemonButton from "../UI/RenamePokemonButton"

export default function PokeStats(props) {
  const { currentUser } = useContext(UserContext)
  const { pokemonStatsOpen, changePokemonStats } = useContext(UIContext)

  return (
    <Modal
      show={pokemonStatsOpen}
      onHide={() => {
        changePokemonStats(props.pokemon)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {`${currentUser.username}'s ${props.pokemon.name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="flex">
          <PokemonStatCard pokemon={props.pokemon} />
          <Container className="flex flex-column">
            <TransferPokemonButton pokemon={props.pokemon} />
            <RenamePokemonButton pokemon={props.pokemon} />
          </Container>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            changePokemonStats(props.pokemon)
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
