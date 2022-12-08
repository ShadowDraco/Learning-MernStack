import { useState } from 'react'
import axios from 'axios'

function App() {

  const [username, setUsername] = useState('')

  function updateUsername(e) {
    setUsername(e.target.value)
  }

  function submitUsername(e) {
    axios.post('/api', { name: username })
  }

  return (
    <div className="App">
      
    <div className="user-form">
      <input type="text" onChange={updateUsername} className="username" value={username}></input>
      <button onClick={submitUsername}>Submit username!</button>
    </div>

    </div>
  )
}

export default App
