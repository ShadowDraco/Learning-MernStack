import axios, { AxiosHeaders } from "axios"
import { useQueries, useQuery } from "@tanstack/react-query"
import React, { useRef } from "react"

export default function Home() {
  const pRef = useRef()

  const [catFactQuery, chuckNorrisQuery] = useQueries({
    queries: [
      {
        queryKey: ["cat-facts"],
        queryFn: () => {
          return axios.get("https://catfact.ninja/fact").then(res => res.data)
        },
      },
      {
        queryKey: ["chuck-facts"],
        queryFn: () => {
          const options = {
            method: "GET",
            url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
            headers: {
              accept: "application/json",
              "X-RapidAPI-Key":
                "a7f18a3567mshb8a2642305f0bb9p19ae07jsn6dd2dc8d48d1",
              "X-RapidAPI-Host":
                "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            },
          }
          return axios.request(options).then(res => res.data)
        },
      },
    ],
  })

  /* const { data, isLoading } = useQuery(["fox"], () => {
    return axios
      .get("https://randomfox.ca/floof/?ref=apilist.fun")
      .then(res => {
        pRef.current.focus()
        return res.data
      })
  })
  */

  if (catFactQuery.isLoading) return "Loading Cat Fact..."
  if (chuckNorrisQuery.isLoading) return "Loading Chuck Fact..."

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Home!</h1>
      <div style={{ paddingTop: "3em" }}>
        Cat Fact!
        <br></br>
        {catFactQuery.data?.fact}
      </div>
      <div style={{ paddingTop: "3em" }}>
        Chuck Fact!
        <br></br>
        {chuckNorrisQuery.data?.value}
      </div>

      {/* <div style={{ paddingTop: "3em" }}>
        Fox picture!
        <br></br>
        {!isLoading ? (k
          <img src={data.image} style={{ width: "300px" }}></img>
        ) : (
          "Loading..."
        )}
        <input ref={pRef}></input>
      </div>
        */}
    </div>
  )
}
