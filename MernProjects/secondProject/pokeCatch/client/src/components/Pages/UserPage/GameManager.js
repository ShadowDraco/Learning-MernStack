import { useState, useContext, useEffect, createContext } from "react"

import { RequestContext, UserContext } from "../../../App"

import Canvas from "./Canvas"

import Container from "react-bootstrap/Container"

import Battle from "../../Pokemon/Battle"

export const EncounterContext = createContext()

export default function CanvasManager() {
  const [pokemonEncountered, setPokemonEncountered] = useState(false)
  const [encounteredPokemon, setEncounteredPokemon] = useState(null)

  const [position, setPosition] = useState({ x: 200, y: 200 })

  const [tallGrassPositions, setTallGrassPositions] = useState([])

  const { setPlayingAnimation, setSpinnerVariant, requestPokemon } =
    useContext(RequestContext)
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    placeTallGrass()
  }, [])

  function placeTallGrass() {
    let tallGrass = []

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        tallGrass.push({
          x: 18 * (j + 1),
          y: 18 * (i + 1),
        })
      }
    }
    setTallGrassPositions(tallGrass)
  }

  async function getEncounteredPokemon() {
    console.log("encountering pokemon")
    setPlayingAnimation(true)
    setSpinnerVariant("success")

    let pokemonId = Math.floor(Math.random(1153) * 100) + 1
    let requestedPokemon = await requestPokemon(
      pokemonId,
      Math.floor(
        Math.random(currentUser.team[1].stats[6].level / 2) * 10 +
          currentUser.team[1].stats[6].level / 2
      )
    )

    setEncounteredPokemon(requestedPokemon)
    setPokemonEncountered(true)
    setPlayingAnimation(false)
  }

  function tryToEncounterPokemon() {
    let chance = Math.floor(Math.random(100) * 100) + 1

    if (chance > 80) {
      getEncounteredPokemon()
    }
  }

  function checkGrass(pos) {
    for (let grass in tallGrassPositions) {
      if (
        pos.x - tallGrassPositions[grass].x < 15 &&
        pos.y - tallGrassPositions[grass].y < 15
      ) {
        tryToEncounterPokemon()
        return
      }
    }
  }

  function handleclicks(e) {
    if (encounteredPokemon === null && !pokemonEncountered) {
      let pos = { x: e.offsetX, y: e.offsetY }
      checkGrass(pos)
      setPosition(pos)
    }
  }

  const draw = ctx => {
    ctx.fillStyle = "#55AA55"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    tallGrassPositions.forEach(grass => {
      ctx.lineWidth = 2
      ctx.strokeStyle = "green"
      ctx.fillStyle = "#009900"

      ctx.beginPath()

      ctx.rect(grass.x - 7, grass.y - 7, 15, 15)

      ctx.fill()
      ctx.stroke()
    })

    ctx.fillStyle = "#FF11FF"
    ctx.fillRect(position.x - 7, position.y - 7, 15, 15)
  }

  return (
    <Container className="flex flex-center">
      {!pokemonEncountered ? (
        <Canvas
          draw={draw}
          width={400}
          height={400}
          handleclicks={handleclicks}
        />
      ) : (
        "Battle!"
      )}
      <EncounterContext.Provider
        value={{
          setEncounteredPokemon,
          setPokemonEncountered,
          encounteredPokemon,
        }}
      >
        {pokemonEncountered ? <Battle /> : ""}
      </EncounterContext.Provider>
    </Container>
  )
}
