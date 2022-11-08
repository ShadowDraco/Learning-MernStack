import { useState } from 'react'

import WordGrid from "./WordGrid"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="wrapper">
        <div className="container">
          <button className="btn btn-blue" onClick={() => setCount((count) => count + 1)}>Click me: {count}</button>

        </div>

        <WordGrid />
        
      </div>

  )
}

export default App
