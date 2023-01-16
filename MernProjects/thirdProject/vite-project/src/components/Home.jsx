import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Home() {
  // The "State" is the data from the get request
  const { data, isLoading } = useQuery(["cat"], () => {
    return axios.get("https://catfact.ninja/fact").then(res => res.data)
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <h1>Home!</h1>
      <p>{data?.fact}</p>
    </div>
  )
}
