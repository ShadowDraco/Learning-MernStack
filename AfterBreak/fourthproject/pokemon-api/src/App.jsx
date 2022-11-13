import { useState, useEffect } from 'react'

import PokemonList from './components/PokemonList'
import Pagination  from './components/Pagination'
import Loading from './components/Loading'
import './app.css'
import './components/loading.css'
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonNames, setPokemonNames] = useState([])
  const [pokemonImages, setPokemonImages] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  // just in cse the api call takes awhile we want to show the user that loading
  // is happening and the page isn't broken 

  // an Effect is something to happen, like an async request 
  // this effect queries the api
  useEffect(() => {
    // set loading true and then set it to false afffter the request is finished
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      // cancel token allows for canceling old requests and this token is set to the cancel variable
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      // the api contains next and previous pages so we set that to state variables */
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)

      setPokemonNames(res.data.results.map(pokemon => pokemon.name))
     
      res.data.results.map(pokemon => {
        axios.get(pokemon.url)
        .then(res => {
          setPokemonImages([...pokemonImages, res.data.sprites.front_default]);
        })
      })


      setLoading(false)
    })
     // if the user makes multiple requests in a row cancel the old one
    return () => cancel()
    // Empty array means no rerender
    // this arrray means rerender every time the currentPAgeUrl changes
  }, [currentPageUrl])

  // pagination controls
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }


  return (
    <div className='wrapper'>
      { loading ? <Loading /> :
        <div className="container">
            <PokemonList pokemonNames={pokemonNames} pokemonImages={pokemonImages} />
            <Pagination 
              gotoNextPage={nextPageUrl ? gotoNextPage : null}
              gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />
        </div>
      }
    </div>
  )
}

export default App
