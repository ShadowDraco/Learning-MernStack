import React, { useEffect, useRef } from "react"

const Canvas = props => {
  const canvasRef = useRef(null)

  const draw = ctx => {
    let halfWidth = ctx.canvas.width / 2
    let halfHeight = ctx.canvas.height / 2

    let playerSize = 15

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.fillStyle = "#FF11FF"
    ctx.fillRect(halfWidth, halfHeight, playerSize, playerSize)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    // first fraw
    draw(context)
  }, [draw])

  return <canvas ref={canvasRef} width={400} height={400} />
}
export default Canvas
