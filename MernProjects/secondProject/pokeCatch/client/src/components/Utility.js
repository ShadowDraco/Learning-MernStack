// take the first letter to upper case then re-insert the rest of the string
export default function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function showPokemonStats(pokemon) {
  console.log("showing stats for", pokemon)
}
