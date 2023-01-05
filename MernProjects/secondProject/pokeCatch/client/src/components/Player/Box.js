import { useContext } from "react"
import { UserContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import "../../App.css"

import PokemonCard from "../Pokemon/PokemonCard"

import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"

export default function Box() {
  const { currentUser } = useContext(UserContext)
  const { boxOpen, changeBoxOpen } = useContext(UIContext)

  return (
    <Offcanvas show={boxOpen} onHide={changeBoxOpen} className="w-75">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`${currentUser.username}'s box`}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container className=" flex flex-wrap w-100">
          {boxOpen
            ? currentUser.box.map((poke, i) => {
                return i > 0 ? (
                  <PokemonCard key={i} pokemon={poke} index={i} type="box" />
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
