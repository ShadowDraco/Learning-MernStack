import React from "react"
import Container from "react-bootstrap/Container"

import AddItemButton from "./AddItemButton"
import AddPokemonButton from "./AddPokemonButton"

export default function CheckStatusButton() {
  return (
    <Container className="flex flex-column mt-3">
      <AddItemButton />
      <AddPokemonButton />
    </Container>
  )
}
