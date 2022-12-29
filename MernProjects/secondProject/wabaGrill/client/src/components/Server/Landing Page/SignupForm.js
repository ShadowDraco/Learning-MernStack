import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default function SignupForm() {
  return (
    <Form>
      <Form.Group className="mb-2" controlId="SignupUsername">
        <Form.Label className="text-light">Username:</Form.Label>
        <Form.Control type="email" placeholder="Enter your unique username" />
        <Form.Text className="text-muted">
          This name is all your own creation!
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="SignupPassword">
        <Form.Label className="text-light">Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your unique password"
        />
        <Form.Text className="text-warning">
          Do not use passwords that you use in other places!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
