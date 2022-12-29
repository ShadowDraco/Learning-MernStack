import React from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import { useState } from "react"

import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import Greeting from "./Greeting"
import LoginMessage from "./LoginMessage"

export default function SignInPage() {
  const [signingUp, setSigningUp] = useState(true)

  function changeSigningUp(e) {
    setSigningUp(!signingUp)
  }

  return (
    <Container className="SignIn bg-dark flex flex-column flex-center p-3">
      <h1 className="text-light bg-gray p-3"> Welcome to Poke Catch! </h1>

      <Container className="Forms bg-dark p-1 w-50">
        {signingUp ? <Greeting /> : <LoginMessage />}

        {signingUp ? <SignupForm /> : <LoginForm />}

        <Button
          className="bg-gray text-info loginSignupButton"
          onClick={changeSigningUp}
        >
          {signingUp ? "Or log in?" : " Sign up?"}
        </Button>
      </Container>
    </Container>
  )
}
