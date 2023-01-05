import { useContext } from "react"
import { UserContext } from "../../App"
import { UIContext } from "../Pages/UserPage/LoggedIn"

import Capitalize from "../Utility/Capitlize"

import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Offcanvas from "react-bootstrap/Offcanvas"
import Tooltip from "react-bootstrap/Tooltip"

export default function Bag() {
  const { currentUser } = useContext(UserContext)
  const { bagOpen, changeBagOpen } = useContext(UIContext)

  return (
    <Offcanvas show={bagOpen} onHide={changeBagOpen}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`${currentUser.username}'s bag`}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
      </Offcanvas.Body>
    </Offcanvas>
  )
}
