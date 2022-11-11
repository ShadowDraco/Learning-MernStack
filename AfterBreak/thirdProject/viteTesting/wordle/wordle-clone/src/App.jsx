import { useState, createContext, useEffect } from 'react'

import Board from './components/Board'
import Keyboard from './components/Keyboard'
import GameOver from './components/GameOver'
import { boardDefault, generateWordSet } from './Words'
import './App.css'

// Pass state using the context API to whatever the ContextProvider contains
export const AppContext = createContext()

function App() {
  // initialize the gameboard as the empty board that was created
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})

  useEffect(() => {
    generateWordSet().then((wordBankWords) =>{
      setWordSet(wordBankWords.wordSet)
      setCorrectWord(wordBankWords.todaysWord)
    })
  }, [])

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
    // create a word out of the guessed letters
    let currentWord = ""
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i]
    }
    // add \r to the word because its in the word bank
    currentWord += '\r'

    // check to see if the guess IS a word
    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0})
    } else {
      alert("Word Not Found")
    }

    // if they guessed correct 
    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({gameOver: true, guessedWord: true})
      return
    }

    // if they failed
    if (currentAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false})
    }
    console.log(correctWord)
  }
  

  return (
    <div className="App">
      
      <div className="container">
        <nav>
          <h1>Wordle</h1>
        </nav>
      </div>
      <AppContext.Provider 
        value={{
          board, 
          setBoard, 
          currentAttempt, 
          setCurrentAttempt, 
          onSelectLetter, 
          onDelete, 
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          setGameOver, 
          gameOver
        }}
        >
        <Board />
        { gameOver.gameOver ? <GameOver /> : <Keyboard /> }
      </AppContext.Provider>

    </div>
  )
}

export default App
