import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchChuckNorrisFact = () => {
  

  return axios.request(options).then(res => res.data)
}

export const useChuckNorrisData = (onSuccess, onError) => {
  return useQuery(["chuck-facts"], fetchChuckNorrisFact, {
    onSuccess,
    onError,
  })
}
