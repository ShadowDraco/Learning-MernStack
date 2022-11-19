import { useState } from 'react'
import axios from 'axios'

import SearchForm from './components/SearchForm'
import ResultContainer from './components/ResultContainer'

import './App.css'
import { useEffect } from 'react'

function App() {

  const [firstSearch, setFirstSearch] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [autoCorrect, setAutoCorrect] = useState(true)

  const options = {
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    params: {q: searchQuery, pageNumber: pageNumber, pageSize: pageSize, autoCorrect: autoCorrect},
    headers: {
      'X-RapidAPI-Key': 'a7f18a3567mshb8a2642305f0bb9p19ae07jsn6dd2dc8d48d1',
      'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  }

  useEffect(() => {
    if (searchQuery !== '') {
      console.log('calling with new search query')

      axios.request(options)
      .then(function (response) {
        console.log(response.status)

        setSearchResults(response.data.value)
        setFirstSearch(true)
      })
      .catch(function (error) {
        console.error(error);
      });
    } else {
      setFirstSearch(true)
    }
    
  }, [searchQuery])

  return (
    <div className="App">
      
    <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

    { firstSearch ? <ResultContainer results={searchResults} /> : "Search to display Here!" }
    </div>
  )
}

export default App
