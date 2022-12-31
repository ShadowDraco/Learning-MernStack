import { useContext, useState } from "react"
import { UserContext } from "../../App"

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

  // take the first letter to upper case then re-insert the rest of the string
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <Container className="">
      <Button onClick={changeBagOpen}>
        {bagOpen ? "Close Bag" : "Open Bag"}
      </Button>
      <Container className="flex">
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
                    className="text-light bg-gray flex flex-column w-25 bag-item"
                  >
                    {item.quantity}:
                    <Image
                      src={`${item.sprites.default}`}
                      alt={`${item.name}`}
                      style={{ width: "3rem" }}
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