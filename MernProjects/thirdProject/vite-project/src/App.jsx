import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./App.css"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Contact from "./components/Contact"

function App() {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <div className="App">App</div>

      <Router>
        <nav>
          <a href="/">Home</a>
          <a href="/contact">Contact</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
