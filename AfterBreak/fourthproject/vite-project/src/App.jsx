import { useState } from 'react'

import ClickButton from './components/ClickButton'
import './App.css'

function App() {
 
  const [clicks, setClicks] = useState(0)

  return (
    <>
      <div className="wrappper">
        
        <div className="container">
          <ClickButton />
        </div>  

      </div>
    </>
  )
}

export default App
