import logo from './logo.svg';
import './App.css';

// import useState to work with variables and events
import { useState, useEffect } from 'react';
// import axios so it can be used
import axios from 'axios';

const App = () => {

  const [num, addNum] = useState(1)
  const [time, setTime] = useState()

  const [character, setCharacter] = useState("Luke Skywalker")
  const getStarWarsPerson = async ()=> {
  
    console.log("getting character")
    let randID = Math.floor(Math.random(30) * 10) + 1
    let res = await axios.get(`https://swapi.dev/api/people/${randID}`)
    console.log(res.data.name);
    setCharacter(res.data.name);
  }

  useEffect(() => {
    setTime(Date())
  }, [])

  setTimeout(() => {
    setTime(Date())
  }, "1000")
 
  return (
    <div className="App">
      
      <div className="App-header">

      
        <h1>Add me</h1>

        <p>{num}</p>
        <button onClick={() => addNum((prevNum) => prevNum + 1)}>Add</button>
        

        <h1>Hello</h1>

        <p>{character} is your friend</p>
        <button onClick={() => getStarWarsPerson()}>Next Character</button>
      

        <h1>Weather</h1>

        <p> is the temperature</p>
        <button onClick={() => console.log("check weather")}>Check</button>

        <p>
        <hr></hr>
          {time}
          <hr></hr>
        </p>
      </div>
      
    </div>
  );
}

export default App;
