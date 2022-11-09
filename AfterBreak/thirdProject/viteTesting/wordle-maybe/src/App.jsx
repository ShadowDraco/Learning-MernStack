import { useState } from 'react'

import WordGrid from "./components/keyboardGrid"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="wrapper">
        
        <WordGrid />
        
      </div>

  )
}

export default App
