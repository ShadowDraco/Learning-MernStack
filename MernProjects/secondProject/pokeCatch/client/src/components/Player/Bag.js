import { useContext, useState } from "react"
import { UserContext } from "../../App"

import Capitalize from "../Utility/Capitlize"

import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

export default function Bag() {
  const { currentUser } = useContext(UserContext)

  const [bagOpen, setBagOpen] = useState(false)

  function changeBagOpen(e) {
    setBagOpen(!bagOpen)
  }

  return (
    <Container className="flex flex-column">
      <Button onClick={changeBagOpen}>
        {bagOpen ? "Close Bag" : "Open Bag"}
      </Button>
      <Container className="flex justify-content-evenly flex-wrap bg-gray">
        {bagOpen
          ? currentUser.bag.map((item, i) => {
              return i > 0 ? (
                <OverlayTrigger
                  key={`${item.name} tooltip`}
                  placement="top"
                  overlay={
                    <Tooltip>{item.flavor_text_entries[3].text}</Tooltip>
                  }
                >
                  <Container
                    key={item.name}
                    className="text-light bg-gray w-auto p-1 m-1 border-bottom border-2"
                  >
                    {item.quantity}:
                    <Image
                      src={`${item.sprites.default}`}
                      alt={`${item.name}`}
                      style={{ width: "3rem" }}
                      className="flex p-0 m-0"
                    ></Image>
                    <p>{Capitalize(item.name)}</p>
                  </Container>
                </OverlayTrigger>
              ) : (
                ""
              )
            })
          : ""}
      </Container>
    </Container>
  )
}
