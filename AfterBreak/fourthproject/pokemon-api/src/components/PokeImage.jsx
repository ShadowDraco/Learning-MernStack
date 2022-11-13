import React from 'react'
import axios from 'axios'

export default function PokeImages({ pokemon }) {
  let image

  console.log(pokemon.url)
  axios.get(pokemon.url)
  .then(res => {
    console.log(res)
  })
  return (
    <div><img src={image}></img></div>
  )
}
