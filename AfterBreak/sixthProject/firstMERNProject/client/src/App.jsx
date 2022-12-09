import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    updateUserList()
  }, [])

  function updateUserList() {
    axios.get('/api/getUsers')
    .then(res => {
      setUserList(res.data)
    })
  }

  const [username, setUsername] = useState('')
  const [userList, setUserList] = useState()

  function updateUsername(e) {
    setUsername(e.target.value)
  }

  function submitUsername(e) {
    axios.post('/api/newUser', { name: username })
  }

  return (
    <div className="App">
      
    <div className="user-form">
      <input type="text" onChange={updateUsername} className="username" value={username}></input>
      <button onClick={submitUsername}>Submit username!</button>
    </div>

    <ul className="user-list">
      { userList ? 
        userList.map(user => {
        
          return (
            <li key={user._id}>{user.name}</li>
          )
        })
        : console.log('no users to display now')
      }

      <button onClick={updateUserList}>Update!</button>
    </ul>

    </div>
  )
}

export default App
