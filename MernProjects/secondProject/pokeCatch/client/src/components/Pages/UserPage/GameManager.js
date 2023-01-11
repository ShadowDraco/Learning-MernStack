import { useState, useContext, createContext, useRef, useEffect } from "react"

import Canvas from "./Canvas"

import Container from "react-bootstrap/Container"

export default function CanvasManager() {
  const [canMove, setCanMove] = useState(true)
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)
  const [halfWidth, setHalfWidth] = useState(width / 2)
  const [halfHeight, setHalfHeight] = useState(height / 2)

  const [playerSize, setPlayerSize] = useState(15)
  const [position, setPosition] = useState({ x: 200, y: 200 })

  useEffect(() => {
    setTimeout(() => {
      setCanMove(true)
    }, 100)
  }, [canMove])

  function handleclicks(e) {
    if (canMove) {
      let pos = { x: e.offsetX, y: e.offsetY }
      setPosition(pos)
      setCanMove(false)
    }
  }

  const draw = ctx => {
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.fillStyle = "#FF11FF"
    ctx.fillRect(position.x, position.y, playerSize, playerSize)
  }

  return (
    <Container>
      <Canvas
        draw={draw}
        width={width}
        height={height}
        handleclicks={handleclicks}
      />
    </Container>
  )
}
