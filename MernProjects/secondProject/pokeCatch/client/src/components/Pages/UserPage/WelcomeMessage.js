import { useContext, useState } from "react"
import { UserContext } from "../../../App"

import Container from "react-bootstrap/Container"
import CloseButton from "react-bootstrap/CloseButton"

export default function WelcomeMessage() {
  const { currentUser } = useContext(UserContext)

  const [welcomeMessageSeen, setWelcomeMessageSeen] = useState(false)

  function closeWelcomeMessage(e) {
    setWelcomeMessageSeen(true)
  }

  return (
    <>
      {!welcomeMessageSeen ? (
        <Container className="flex flex-center">
          <h1 className="text-light m-3">Welcome {currentUser.username}</h1>
          <CloseButton variant="white" onClick={closeWelcomeMessage} />
        </Container>
      ) : (
        ""
      )}
    </>
  )
}
