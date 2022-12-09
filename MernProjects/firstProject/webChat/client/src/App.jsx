import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [userList, setUserList] = useState()

  return (
    <div className="App">
      <UserList />
    </div>
  )
}

export default App
