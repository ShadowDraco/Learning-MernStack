import React from "react"
import Button from "react-bootstrap/Button"
import axios from "axios"

export default function CheckStatusButton() {
  function checkServerStatus() {
    axios.get("http://localhost:5000/healthy").then(res => {
      console.log(res.data)
    })
  }

  return (
    <Button className="btn-sm btn-success" onClick={checkServerStatus}>
      Check server status!
    </Button>
  )
}
