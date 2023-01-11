import { useEffect, useRef } from "react"

const Canvas = props => {
  const { draw, ...rest } = props

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    canvasRef.current.addEventListener("click", props.handleclicks)

    const render = () => {
      draw(context)
      canvasRef.current.focus()
    }
    render()
  }, [draw])

  return <canvas ref={canvasRef} {...rest} />
}
export default Canvas
