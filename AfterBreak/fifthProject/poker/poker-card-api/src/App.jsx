import { useState, useEffect, createContext } from 'react'

import LandingPage from './components/LadingPage'
import './App.css'


export const GameContext = createContext()

function App() {
  
  /* Numbers and variables to do with players */ 
  const [numberOfPlayers, setNumberOfPlayers] = useState(2) // int
  const [players, setPlayers] = useState([]) // list of player objects
  const [minBet, setMinBet] = useState(1)
  const [maxBet, setMaxBet] = useState(10)
  const [startingMoney, setStartingMoney] = useState(100)

  return (
    <div className="App">

      <GameContext.Provider
      value={{
        players,
        setPlayers,
        numberOfPlayers,
        setNumberOfPlayers,
        minBet,
        setMinBet,
        maxBet,
        setMaxBet,
        startingMoney,
        setStartingMoney
      }}
      >

      <LandingPage />
      
      </GameContext.Provider>

    </div>
  )
}

export default App
