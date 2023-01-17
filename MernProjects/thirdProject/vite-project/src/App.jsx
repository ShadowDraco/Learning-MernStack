import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"

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
          <a href="/profile">Profile</a>
          <a href="/contact">Contact</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
