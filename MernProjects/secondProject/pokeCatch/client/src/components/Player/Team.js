import { useContext } from "react"
import { UserContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"

import PokemonCard from "../Pokemon/PokemonCard"

export default function Team() {
  const { currentUser } = useContext(UserContext)
  const { teamOpen, changeTeamOpen } = useContext(UIContext)

  return (
    <Offcanvas show={teamOpen} onHide={changeTeamOpen} className="w-75">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> {`${currentUser.username}'s team`}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container className="flex flex-wrap w-100">
          {teamOpen
            ? currentUser.team.map((poke, i) => {
                return i > 0 ? (
                  <PokemonCard pokemon={poke} index={i} type="team" key={i} />
                ) : (
                  ""
                )
              })
            : ""}
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
