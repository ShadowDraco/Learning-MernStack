import "./App.css"
import Container from "react-bootstrap/Container"

import SignInPage from "./components/Server/Landing Page/SignInPage"

function App() {
  return (
    <Container className="App bg-dark flex">
      <SignInPage />
    </Container>
  )
}

export default App
