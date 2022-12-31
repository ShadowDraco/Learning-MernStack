import axios from "axios"
import { useState, useContext } from "react"

import { UserContext } from "../../../App"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default function SignupForm() {
  const { setCurrentUser, setUserLoggedIn } = useContext(UserContext)
  const [currentUsername, setCurrentUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [successfulLogin, setSuccessfulLogin] = useState()

  function changeUsername(e) {
    setCurrentUsername(e.target.value)
  }

  function changePassword(e) {
    setCurrentPassword(e.target.value)
  }

  function submitLogin(e) {
    e.preventDefault()
    axios
      .post("http://localhost:5000/user/login", {
        username: currentUsername,
        password: currentPassword,
      })
      .then(res => {
        console.log(res.data)
        if (res.data.status === "success") {
          setSuccessfulLogin(true)
          setCurrentUser(res.data.user)
          console.log(res.data.user)
          setUserLoggedIn(true)
        } else {
          setSuccessfulLogin(false)
        }
      })
  }

  return (
    <Form>
      <Form.Group className="mb-2" controlId="LoginUsername">
        <Form.Label className="text-light">Username:</Form.Label>
        <Form.Control
          onChange={changeUsername}
          type="username"
          placeholder="Enter your username"
        />
        <Form.Text className="text-muted">All you!</Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="LoginPassword">
        <Form.Label className="text-light">Password:</Form.Label>
        <Form.Control
          onChange={changePassword}
          type="password"
          placeholder="Enter your password"
        />
        <Form.Text className="text-warning">
          Remember to keep your passwords safe!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitLogin}>
        Submit
      </Button>
      {successfulLogin ? (
        successfulLogin === true ? (
          <p className="text-success">Success</p>
        ) : (
          <p className="text-danger">Something went wrong with your Login :/</p>
        )
      ) : (
        ""
      )}
    </Form>
  )
}
