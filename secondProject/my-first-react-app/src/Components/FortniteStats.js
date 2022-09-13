// use server requests to search for a specific user's stats with a search form


// import useState to work with variables and events
import { useState, useEffect } from 'react';
// import axios so it can be used
import axios from 'axios';

import StatDisplay from './StatDisplay'

let fortniteKey = 'none'
const playerStats = <StatDisplay />

const FortniteStatTracker = () => {

    // Get the keys from the config file
    const pathForKeys = '/config.json'
    axios.get(pathForKeys)
    .then((res) => fortniteKey = res.data[0].key);

    // create a useState for the current player that is being tracked
    const [playerName, setPlayerName] = useState('');
    
    async function submitHandler(e) {
        e.preventDefault(); // prevent reload
    
        setPlayerName(e.target.value)   // playerName gets set here but I keep using target.value because it doesn't appear until later

        console.log("getting stats for:", e.target.value)
        
        const req = axios.get(`https://fortnite-api.com/v2/stats/br/v2?name=${e.target.value}`, { headers: { "Authorization": `${fortniteKey}` } })
        .then((res) => {
            console.log(res.data)
            playerStats = <StatDisplay data={res.data}/>
        })

        console.log(req)

       /*
       const news = axios.get("https://fortnite-api.com/v2/news").then((res) => {
            console.log(res.data)
       })
       */
           
    }

    return (
        <div>
            <h1>Fortnite Stats Tracker BABYYYY!</h1>
            <h4>Find your stats</h4>
            <p>{playerName}</p>
            <form onSubmit={submitHandler}>
                <label for="name">Fortnite name:</label>
                <input onChange={(e)=>submitHandler(e)} value={playerName} type="text" id="name" placeholder="#1VicRoyBoy" />
                <small></small>

                <br></br>
                <button type="submit">Try!</button>
                <br></br>
            </form>
            <br></br><br></br>

            <div>
                <StatDisplay />
            </div>
        </div>
    );


}

export default FortniteStatTracker;