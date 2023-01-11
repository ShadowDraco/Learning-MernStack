import { useEffect, useRef } from "react"

const Canvas = props => {
  const { draw, ...rest } = props

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    const render = () => {
      draw(context)
    }
    render()
  }, [draw])

  return <canvas ref={canvasRef} {...rest} />
}
export default Canvas
