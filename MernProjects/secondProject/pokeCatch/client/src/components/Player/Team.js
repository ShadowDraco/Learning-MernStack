import { useContext, useState } from "react"
import { UserContext } from "../../App"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import PokemonCard from "../Pokemon/PokemonCard"

export default function Team() {
  const { currentUser } = useContext(UserContext)

  const [teamOpen, setTeamOpen] = useState(false)

  function changeTeamOpen(e) {
    setTeamOpen(!teamOpen)
  }

  return (
    <Container className="flex flex-column">
      <Button onClick={changeTeamOpen}>
        {teamOpen ? "Close Team" : "Open Team"}
      </Button>
      <Container className="flex">
        {teamOpen
          ? currentUser.team.map((poke, i) => {
              return i > 0 ? (
                <PokemonCard
                  pokemon={poke}
                  index={i}
                  type="team"
                  key={i}
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
