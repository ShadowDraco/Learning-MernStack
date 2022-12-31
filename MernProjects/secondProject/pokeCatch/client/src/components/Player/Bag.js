import { useContext, useState } from "react"
import { UserContext } from "../../App"

import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

export default function Bag() {
  const { currentUser } = useContext(UserContext)

  const [bagOpen, setBagOpen] = useState(false)

  function changeBagOpen(e) {
    setBagOpen(!bagOpen)
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
                <Container
                  key={item.name}
                  className="text-light bg-gray flex flex-column w-25"
                >
                  {item.quantity}:
                  <Image
                    src={`${item.sprites.default}`}
                    alt={`${item.name}`}
                    style={{ width: "3rem" }}
                  ></Image>
                  <p>{item.name}</p>
                </Container>
              ) : (
                ""
              )
            })
          : ""}
      </Container>
    </Container>
  )
}
