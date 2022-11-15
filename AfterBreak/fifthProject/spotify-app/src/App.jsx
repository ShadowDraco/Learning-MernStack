import { useState, useEffect } from 'react'
import './app.css'

import MemeList from './components/MemeList'
import axios from 'axios'

function App() {

  const [memes, setMemes] = useState([])
  

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes")
    .then(function (res) {
      
      setMemes(res.data.data.memes)
      
    }).catch(function (error) {
      console.log(error)
    });

  }, [])

  return (
    <div className="App">
      <MemeList memes={memes}/> 
    </div>
  )
}

export default App
