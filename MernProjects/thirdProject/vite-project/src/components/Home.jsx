import React, { useRef, useState, useEffect } from "react"
import { useCatQuery } from "./useCatQuery"
import axios from "axios"

export default function Home() {
  const pRef = useRef(null)
  const [catFact, setCatFact] = useCatQuery()

  return (
    <div>
      <h1>Home!</h1>
      <p>{!catFact.isLoading ? catFact.fact : ""}</p>
      <p ref={pRef}></p>
    </div>
  )
}
