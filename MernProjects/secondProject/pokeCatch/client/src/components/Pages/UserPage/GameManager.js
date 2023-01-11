import { useState, useContext, createContext, Component } from "react"

import Canvas from "./Canvas"

import Container from "react-bootstrap/Container"

export default function CanvasManager() {
  constructor(props) {
    super(props)
    this.focusRef = React.createRef()
  }

  componentDidMount() {
    this.inputRef = React.current.focus()
  }

  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)
  const [halfWidth, setHalfWidth] = useState(width / 2)
  const [halfHeight, setHalfHeight] = useState(height / 2)

  const [playerSize, setPlayerSize] = useState(15)
  const [playerLocation, setPlayerLocation] = useState("wild")
  const [position, setPosition] = useState({ x: 200, y: 200 })
  const [direction, setDirection] = useState("")
  const [runSpeed, setRunSpeed] = useState(4)
  const [walkSpeed, setWalkSpeed] = useState(2)

  const [walking, setWalking] = useState(false)
  const [running, setRunning] = useState(false)
  const [idle, setIdle] = useState(true)

  setInterval(function () {
    checkMovement()
  }, 60)

  function checkMovement() {
    if (idle) {
    } else {
      walking ? walk() : run()
    }
  }

  function walk() {
    switch (direction) {
      case "left":
        setPosition(position.x - walkSpeed)
        break
      case "right":
        setPosition(position.x + walkSpeed)
        break
      case "up":
        setPosition(position.y - walkSpeed)
        break
      case "down":
        setPosition(position.y + walkSpeed)
        break
      default:
        break
    }
  }

  function run() {
    switch (direction) {
      case "left":
        setPosition(position.x - runSpeed)
        break
      case "right":
        setPosition(position.x + runSpeed)
        break
      case "up":
        setPosition(position.y - runSpeed)
        break
      case "down":
        setPosition(position.y + runSpeed)
        break
      default:
        break
    }
  }

  function handleKeys(e) {
    console.log(e)
  }

  const draw = ctx => {
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.fillStyle = "#FF11FF"
    ctx.fillRect(position.x, position.y, playerSize, playerSize)
  }

  render() {

  return (
    <Container ref={focuseRef} onFocus={keepFocus}>
      <Canvas draw={draw} width={width} height={height} />
    </Container>
  )
  }
}
