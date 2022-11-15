import React, { useState } from 'react'
import axios from 'axios'

import PokeEntry from './PokeEntry'

export default function PokemonList({ pokemon, setLoading }) {
  
  const [images, setImages] = useState([])

  return (
    <div className="container" id='pokemon-list'>
      { /* map the pokemon with parentheis means to return each thing that is mapped
           id is set to the name of the pokemon because react needs an ID for things
           inside of an array and we kow there are no duplicate pokemon so the id will be unique */ }
      
      {
        pokemon.map((pokemon, i) => {
          console.log(i)
          axios.get(pokemon.url)
          .then(res => {
            setImages([...images, res.data.sprites.front_default])
          })
          return (
            <PokeEntry key={`${pokemon.name}-container`} pokemon={pokemon.name} image={images[i-1]} />
          )
        })
      }
    </div>
  )
}
