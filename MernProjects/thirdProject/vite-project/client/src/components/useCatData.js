import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const fetchCatFact = () => {
  return axios.get("https://catfact.ninja/fact").then(res => res.data)
}

export const useCatData = setCatFact => {
  return useQuery(["cat-facts"], fetchCatFact, {
    select: data => {
      const fact = data.fact
      setCatFact(fact)
    },
  })
}
