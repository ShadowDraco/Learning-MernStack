import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default function LoginForm() {
  return (
    <Form>
      <Form.Group className="mb-2" controlId="LoginUsername">
        <Form.Label className="text-light">Username:</Form.Label>
        <Form.Control type="email" placeholder="Enter your username" />
        <Form.Text className="text-muted">Your creation!</Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="LoginPassword">
        <Form.Label className="text-light">Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" />
        <Form.Text className="text-warning">
          Remember to keep your passwords secure!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
