import { useState, useEffect, createContext } from 'react'

import GamePage from './components/GamePage'
import ReviewPage from './components/ReviewPage'
import LandingPage from './components/LadingPage'
import './App.css'


export const AppContext = createContext()

function App() {
  
  /* Numbers and variables to do with players */ 
  const [numberOfPlayers, setNumberOfPlayers] = useState(2) // int
  const [players, setPlayers] = useState([]) // list of player objects
  const [minBet, setMinBet] = useState(1) // bets
  const [maxBet, setMaxBet] = useState(10) // bets
  const [startingMoney, setStartingMoney] = useState(100) // starting amounts
  const [smallBlind, setSmallBlind] = useState(2)
  const [bigBlind, setBigBlind] = useState(4)

  /* Game variables */
  const [gameStarted, setGameStarted] = useState(false)
  const [reviewingGame, setReviewingGame] = useState(false)
  const [dealer, setDealer] = useState({hand: ''})
  const [gameDeck, setGameDeck] = useState()
  const [GAMESAVE, setGAMESAVE] = useState()


  return (
    <div className="App">

      <AppContext.Provider
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
        setStartingMoney,
        smallBlind,
        setSmallBlind,
        bigBlind,
        setBigBlind,
        setReviewingGame,
        setGameStarted,
        gameDeck, 
        setGameDeck,
        dealer,
        setDealer,
        GAMESAVE,
        setGAMESAVE
      }}
      >
      { gameStarted ? <GamePage /> : reviewingGame ? <ReviewPage /> : <LandingPage />
      }
      
      </AppContext.Provider>

    </div>
  )
}

export default App
