import React from "react"
import { useQuery } from "@tanstack/react-query"

export default function Profiles() {
  function getProfiles() {
    return new Promise(res => {
      res([
        { name: "johnny", age: 9 },
        { name: "bobby", age: 8 },
      ])
    })
  }

  const {
    status,
    error,
    data: profiles,
  } = useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
  })

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <div>
      <h1>Profiles</h1>
      <ul>
        {profiles?.map(profile => {
          return (
            <li>
              {profile.name}: {profile.age}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
