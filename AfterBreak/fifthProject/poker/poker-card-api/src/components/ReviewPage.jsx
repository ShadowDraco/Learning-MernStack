import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { GameContext } from '../App'


export default function ReviewPage() {

    const { numberOfPlayers, players, setPlayers, startingMoney } = useContext(GameContext)

    const [currentPlayerName, setCurrentPlayerName] = useState('')
    const [playersCreated, setPlayersCreated] = useState(0)
    const [gameDeck, setGameDeck] = useState({})
/*
    useEffect(() => {
        axios.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => {
            console.log(res)
        })
    }, [])

*/


    function changeCurrentPlayerName(e) {
        setCurrentPlayerName(e.target.value)
    }

    function submitCurrentPlayer(e) {

        console.log(players, numberOfPlayers, playersCreated)

        setPlayersCreated(playersCreated + 1)

        const newPlayer = {
            name: currentPlayerName,
            hand: '',
            currentBet: 0,
            currentMoney: startingMoney,
        }

        setPlayers([...players, newPlayer])
        
        setPlayers(players => ([...players, newPlayer]))

        if (playersCreated === numberOfPlayers) { 
            
            e.target.disabled = true
            e.target.previousElementSibling.disabled = true

        }

        console.log(players, numberOfPlayers, playersCreated)

    }

  return (
    <div className="review-page">

        <div className="page-title">
            <h1>Ready Players?</h1>
        </div>

        <div className="get-players">
            <p>Name yourselves</p>
            {/* get the names of players */}
            <input className="name-player" type="text" onChange={changeCurrentPlayerName}></input>
            <button onClick={submitCurrentPlayer}>Enter</button>
        </div>

        <div className="game-values">
            <p>Your game has these players:</p>

            <textarea disabled={true} 
                value={
                    players
                }
            >
                
            </textarea>
        </div>

    </div>
  )
}
