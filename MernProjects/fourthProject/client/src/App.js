import "./App.css"
import { useEffect } from "react"
import axios from "axios"

function App() {
  useEffect(() => {
    console.log("requesting health")
    axios.get("http://localhost:8000/healthy").then(res => {
      console.log(res.data)
    })
  }, [])

  return <div className="App">Bible App</div>
}

export default App
