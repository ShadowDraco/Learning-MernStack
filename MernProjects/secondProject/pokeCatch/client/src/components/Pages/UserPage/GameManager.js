import { useState, useContext, createContext, useRef, useEffect } from "react"
import axios from "axios"

import Canvas from "./Canvas"

import Container from "react-bootstrap/Container"
import PokemonCard from "../../Pokemon/PokemonCard"

export default function CanvasManager() {
  const [canMoveTimer, setCanMoveTimer] = useState(false)
  const [canMove, setCanMove] = useState(false)
  const [canEncounter, setCanEncounter] = useState(false)
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)
  const [halfWidth, setHalfWidth] = useState(width / 2)
  const [halfHeight, setHalfHeight] = useState(height / 2)

  const [pokemonEncountered, setPokemonEncountered] = useState(false)
  const [encounteredPokemon, setEncounteredPokemon] = useState()

  const [playerSize, setPlayerSize] = useState(15)
  const [position, setPosition] = useState({ x: 200, y: 200 })

  const [tallGrassPositions, setTallGrassPositions] = useState([])

  useEffect(() => {
    placeTallGrass()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setCanMove(true)
      setCanMoveTimer(false)
    }, 500)
  }, [canMoveTimer])

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
    let pokemonId = Math.floor(Math.random(1153) * 100) + 1
    let pokemon

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => {
        // set the pokemon
        pokemon = res.data
        // get the pokemon's description
        axios.get(res.data.species.url).then(res => {
          pokemon.genera = res.data.genera[7].genus
        })
      })
    console.log(pokemon)

    setEncounteredPokemon(pokemon)
    setPokemonEncountered(true)
  }

  function tryToEncounterPokemon() {
    let chance = Math.floor(Math.random(100) * 100) + 1
    console.log(chance)

    if (chance > 80) {
      getEncounteredPokemon()
      setCanEncounter(false)
      setCanMove(false)
    } else {
      setCanEncounter(true)
    }
  }

  function checkGrass(pos) {
    for (let grass in tallGrassPositions) {
      if (
        pos.x - tallGrassPositions[grass].x < 15 &&
        pos.y - tallGrassPositions[grass].y < 15
      ) {
        tryToEncounterPokemon()
        setCanEncounter(false)
        setCanMove(false)
        return
      }
    }
  }

  function handleclicks(e) {
    if (pokemonEncountered) return
    if (canMoveTimer) return
    if (canMove) {
      let pos = { x: e.offsetX, y: e.offsetY }
      checkGrass(pos)
      setPosition(pos)
      setCanMoveTimer(true)
      setCanMove(false)
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
    ctx.fillRect(position.x - 7, position.y - 7, playerSize, playerSize)
  }

  return (
    <Container>
      <Canvas
        draw={draw}
        width={width}
        height={height}
        handleclicks={handleclicks}
      />
      {pokemonEncountered ? (
        <Container>
          <PokemonCard
            pokemon={encounteredPokemon}
            index={encounteredPokemon.order}
            type="starter"
          />
        </Container>
      ) : (
        ""
      )}
    </Container>
  )
}
