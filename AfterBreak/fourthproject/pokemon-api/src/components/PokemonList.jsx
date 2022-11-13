import React from 'react'
import axios from 'axios'

export default function PokemonList({ names, images }) {
  

  return (
    <div className="container" id='pokemon-list'>
      { /* map the pokemon with parentheis means to return each thing that is mapped
           id is set to the name of the pokemon because react needs an ID for things
           inside of an array and we kow there are no duplicate pokemon so the id will be unique */ }
      
      {
        names.map((name, i) => {
          return (
            <div className="poke-container">
              <div className="pokemon">
                {name}  
              </div>

              <div className="pokeImage"> 
                {images[i]}
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
