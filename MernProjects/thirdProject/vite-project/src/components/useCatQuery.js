import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export const useCatQuery = () => {
  const { data, isLoading } = useQuery("catFact", () => {
    return axios.get("https://catfact.ninja/fact").then(res => res.data)
  })

  return [data, isLoading]
}
