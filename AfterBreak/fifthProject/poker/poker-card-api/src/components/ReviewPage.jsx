import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'


export default function ReviewPage() {

    const { numberOfPlayers, setNumberOfPlayers, players, setPlayers, startingMoney, setReviewingGame, setGameStarted, gameDeck, setGameDeck, GAMESAVE, setGAMESAVE } = useContext(AppContext)

    const [currentPlayerName, setCurrentPlayerName] = useState('')
    const [playersCreated, setPlayersCreated] = useState(0)
    const [loadedFromSession, setLoadedFromSession] = useState(false)

    useEffect(() => {
        // check if a deck already exists this session
        sessionStorage.getItem('gameDeck') ? loadSessionGame() :

        // create a new deck
        axios.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res => {
            console.log(res)
            setGameDeck(res.data)
            sessionStorage.setItem('gameDeck', JSON.stringify(res.data))
        })  
    }, [])

    function loadSessionGame() {
        console.log('loading session game')
        // load the previous game deck
        setGameDeck(JSON.parse(sessionStorage.getItem('gameDeck')))

        let loadedPlayers = JSON.parse(sessionStorage.getItem('players'))
        // if the players didn't get set before page reload skip this
        if(loadedPlayers) {
            setPlayers(loadedPlayers)
            setPlayersCreated(loadedPlayers.length)
            loadedPlayers.length >= numberOfPlayers ? setLoadedFromSession(true) : console.log('name more players')
        } 
        else { console.log('name players to continue')  }

    }


    function startGame(e) {
        // save the players that  were named then start the game
        sessionStorage.setItem('players', JSON.stringify(players))

        setReviewingGame(false)
        setGameStarted(true)
    }


    function changeCurrentPlayerName(e) {
        setCurrentPlayerName(e.target.value)
    }

    function addNewPlayer(newPlayer) {
        setPlayersCreated(playersCreated + 1)
        setPlayers([...players, newPlayer])
    }

    function submitCurrentPlayer(e) {

        console.log('naming player')

        const newPlayer = {
            name: currentPlayerName,
            currentBet: 0,
            currentMoney: startingMoney,
            firstTurn: false,
        }
        // function used because state doesn't refresh and functions are more versatile
        addNewPlayer(newPlayer)
        e.target.previousElementSibling.value = ""

        if (playersCreated === numberOfPlayers - 1) { 
            // if the right number of players is created disable the inputs
            e.target.disabled = true
            e.target.previousElementSibling.disabled = true
        }

    }

    function loadGame() {
        localStorage.getItem('GAMESAVE') ? setGAMESAVE(localStorage.getItem('GAMESAVE')) : console.log('no game saved')
    }

    function refreshGame() {
        sessionStorage.clear()
        setReviewingGame(false)
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
            {/* if Enought players are loaded from the session disable the submit button */}
            <button onClick={submitCurrentPlayer} disabled={loadedFromSession}>Enter</button>

            <div className="refresh-game">
                    <button onClick={refreshGame}>Refresh</button>
            </div>
        </div>

        <div className="game-values">
            <p>Your game has these players:</p>

            <textarea disabled={true} 
                value={
                    loadedFromSession || playersCreated ? players.map((player, i) => {
                        return(`${i > 0 ? '\n' : ''}Player ${i+1}: ${player.name}`)
                    })
                    : ''
                }>   
            </textarea>
            {/* if a gamesave is loaded or the correct number of players is loaded then show the user */ }
            <button onClick={startGame}  className={GAMESAVE || playersCreated == numberOfPlayers ? 'green' : 'none'}>Start the Game!</button>

            <div className="load-game" disabled={GAMESAVE}>
                    <button onClick={loadGame}>Load Game!</button>
            </div>
        </div>

    </div>
  )
}
