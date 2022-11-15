import React from 'react'

import PokeEntry from './PokeEntry'

export default function PokemonList({ pokemon, images }) {

  return (
    <div className="container" id='pokemon-list'>
      { /* map the pokemon with parentheis means to return each thing that is mapped
           id is set to the name of the pokemon because react needs an ID for things
           inside of an array and we kow there are no duplicate pokemon so the id will be unique */ }
      
      {
        pokemon.map((pokemon, i) => {
          return (
            <PokeEntry key={`${pokemon.name}-container`} pokemon={pokemon.name} image={images[i]} />
          )
        })
      }
    </div>
  )
  }
