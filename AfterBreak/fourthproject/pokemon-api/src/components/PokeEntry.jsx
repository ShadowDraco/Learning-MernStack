import React from 'react'

export default function PokeImages({ pokemon, image }) {
  
  return (
    <div className="poke-container">
      <div className="pokemon"> {pokemon} </div>
      <img className="pokeImage" src={image}></img>
    </div>
  )
}
