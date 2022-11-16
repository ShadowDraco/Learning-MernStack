import { useState, useEffect } from 'react'
import axios from 'axios'

import Loading from './components/Loading'
import MemeContainer from './components/MemeContainer'

import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  let canLoadMemes = localStorage.getItem('myMemes') ?  true : false

  // list of all memes
  const [memes, setMemes] = useState([])
  // index of the current displayed meme
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0)
  let currentMeme = memes[currentMemeIndex]

  const [topText, setTopText] = useState('Top text')
  const [bottomText, setBottomText] = useState('Bottom text')

  const [myMemes, setMyMemes] = useState([])
  const [myMemeIndex, setMyMemeIndex] = useState(0)
  let myCurrentMeme = myMemes[myMemeIndex]
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

  /* 
    meme control functions  
  */ 

  function nextMeme() {
    setCurrentMemeIndex(currentMemeIndex + 1)
  }
  function prevMeme() {
    setCurrentMemeIndex(currentMemeIndex > 0 ?currentMemeIndex - 1: console.log("no previous meme"))
  }

  function handleTopText(event) {
    setTopText(event.target.value)
  }

  function handleBottomText(event) {
    setBottomText(event.target.value)
  }

  function submitMeme() {

    // specify parameters for the api
    let params = {
      template_id: currentMeme.id,  
      username: 'ShadowDraco2020',
      password: 'ij*EcxFLk.5gkP9',
      text0: topText,
      text1: bottomText,
    }
    // url encode the parameters for the api post request
    let bodyParams = Object.keys(params)
        .map((key) => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        }).join('&')

    console.log(bodyParams)

    fetch("https://api.imgflip.com/caption_image", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyParams
    })
    .then(res => res.json())
    .then((data) => {
      let newMeme = {
        id: Math.random(1000) * 100,
        url: data.data.url
      }
      setMyMemes([...myMemes, newMeme])
    }).catch(error => {
      console.log(error)
    })
  }


  /* 
    user meme controls 
  */ 
  function saveMemes() {
    localStorage.setItem('myMemes', JSON.stringify(myMemes))
  }

  function loadMemes() {
    setMyMemes(JSON.parse(localStorage.getItem('myMemes')))
  }

  function myNextMeme() {
    setMyMemeIndex(myMemeIndex < myMemes.length - 1 ? myMemeIndex + 1 : console.log("no next meme"))
  }
  function myPrevMeme() {
    setMyMemeIndex(myMemeIndex > 0 ? currentMemeIndex - 1: console.log("no previous meme"))
  }

  return (
    <div className="App">
      {
        loading ? <Loading /> : 
        <MemeContainer key="api-memes"
        meme={currentMeme} 
        nextMeme={nextMeme} 
        prevMeme={prevMeme} 
        submitMeme={submitMeme} 
        handleTopText={handleTopText}
        handleBottomText={handleBottomText}
        topText={topText}
        bottomText={bottomText}
      />
      }
      {
        myMemes.length > 0 ? <MemeContainer key='my-memes' meme={myCurrentMeme} nextMeme={myNextMeme} prevMeme={myPrevMeme} saveMemes={saveMemes} /> : <p className="create">Create some memes to see them Here!</p>
      }
      { canLoadMemes ? <button onClick={loadMemes} className="load-button">Load Memes</button> : 'Save memes to load Here!'}
      
    </div>
  )
}

export default App
