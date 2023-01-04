import { useContext, useState } from "react"
import { UserContext } from "../../App"

import showPokemonStats from "../Utility/ShowPokemonStats"
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
    <Container className="">
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
                  onClick={() => {
                    showPokemonStats(poke)
                  }}
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
