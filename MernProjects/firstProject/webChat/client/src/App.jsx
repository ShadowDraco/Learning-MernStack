import { useState, createContext } from 'react'
import LoginPage from './Components/Pages/LoginPage'
import UserPage from './Components/Pages/UserPage'

import './App.css'

export const UserContext = createContext()

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  return (
    <div className="App">
      <UserContext.Provider 
      value={{
        userLoggedIn, setUserLoggedIn,
        currentUser, setCurrentUser
      }}>
        { userLoggedIn ? <UserPage /> 
          : 
          <LoginPage /> 
        }
      </UserContext.Provider>
    </div>
  )
}

export default App
