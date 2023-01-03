import { useContext, useState } from "react"
import { UserContext } from "../../App"

import Capitalize from "../Utility"
import "./Team.css"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import ProgressBar from "react-bootstrap/ProgressBar"
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
                <PokemonCard pokemon={poke} index={i} type="team" />
              ) : (
                ""
              )
            })
          : ""}
      </Container>
    </Container>
  )
}
