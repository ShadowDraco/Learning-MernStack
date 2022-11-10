import { useState, createContext, useEffect } from 'react'

import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { boardDefault } from './Words'
import './App.css'

// Pass state using the context API to whatever the ContextProvider contains
export const AppContext = createContext()

function App() {
  // initialize the gameboard as the empty board that was created
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0})

  const onSelectLetter = (keyValue) => {
    
    if(currentAttempt.letterPos > 4) return
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyValue
    setBoard(newBoard)
    setCurrentAttempt({
      attempt: currentAttempt.attempt, 
      letterPos: currentAttempt.letterPos + 1 })
  }

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return
      const newBoard = [...board]
      newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = ''
      setBoard(newBoard)
      setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return
    setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0})
  }
  

  return (
    <div className="App">
      
      <div className="container">
        <nav>
          <h1>Wordle</h1>
        </nav>
      </div>
      <AppContext.Provider value={{
        board, 
        setBoard, 
        currentAttempt, 
        setCurrentAttempt, 
        onSelectLetter, 
        onDelete, 
        onEnter
        }}
        >
        <Board />
        <Keyboard />
      </AppContext.Provider>

    </div>
  )
}

export default App
