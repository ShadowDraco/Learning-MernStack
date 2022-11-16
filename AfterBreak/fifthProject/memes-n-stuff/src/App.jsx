import { useState, useEffect } from 'react'
import axios from 'axios'

import Loading from './components/Loading'
import MemeContainer from './components/MemeContainer'

import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  // list of all memes
  const [memes, setMemes] = useState([])
  // index of the current displayed meme
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0)
  let currentMeme = memes[currentMemeIndex]

  // set the memes from the api
  useEffect(() => {
    // tell the page is loading
    setLoading(true)

    let cancel 
    axios.get("https://api.imgflip.com/get_memes", {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setMemes(res.data.data.memes)
      currentMeme = memes[currentMemeIndex]
      
      setLoading(false)
    })

    // request is done so stop loading

    return () => cancel()
  }, [])

  function nextMeme() {
    setCurrentMemeIndex(currentMemeIndex + 1)
  }
  function prevMeme() {
    setCurrentMemeIndex(currentMemeIndex > 0 ?currentMemeIndex - 1: console.log("no previous meme"))
  }

  return (
    <div className="App">
      {loading ? <Loading /> : <MemeContainer meme={currentMeme} nextMeme={nextMeme} prevMeme={prevMeme} />}
    </div>
  )
}

export default App
