// take the first letter to upper case then re-insert the rest of the string
export default function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
