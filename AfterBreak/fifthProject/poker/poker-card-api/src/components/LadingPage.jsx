import React, { useContext, useState } from 'react'
import { GameContext } from '../App'

export default function LandingPage() {
    const { numberOfPlayers, setNumberOfPlayers, players, setPlayers, minBet, setMinBet, maxBet, setMaxBet, startingMoney, setStartingMoney } = useContext(GameContext)
   
    function changePlayerNumber(e) {
        // set the number of players each time they change so they persist on page reload
        setNumberOfPlayers(e.target.value)
    }

    function submitNumberOfPlayers(e) {
        // disable the inputs when submitted 
        e.target.disabled = true
        e.target.previousElementSibling.disabled = true
    }

    function changeMinBet(e) {
        // set the bet each time they change so they persist on page reload
        setMinBet(e.target.value)
    }

    function submitMinBet(e) {
        // disable the inputs when submitted 
        e.target.disabled = true
        e.target.previousElementSibling.disabled = true
    }

    function changeMaxBet(e) {
        // set the bet each time they change so they persist on page reload
        setMaxBet(e.target.value)
    }

    function submitMaxBet(e) {
        // disable the inputs when submitted 
        e.target.disabled = true
        e.target.previousElementSibling.disabled = true
    }

    function changeStartingMoney(e) {
        // set the number of players each time they change so they persist on page reload
        setStartingMoney(e.target.value)
    }

    function submitStartingMoney(e) {
        // disable the inputs when submitted 
        e.target.disabled = true
        e.target.previousElementSibling.disabled = true
    }

    return (
        <div className='landing-page'>

            <div className="page-title">
                <h1>Play Poker!</h1>
            </div>

            <div className="get-players">
                <p>Welcome to how many players?</p>
                {/* get the number of players */}
                <input className="player-input" type="number" min={2} max={6} value={numberOfPlayers} onChange={changePlayerNumber}></input>
                <button onClick={submitNumberOfPlayers}>Enter</button>
            </div>

            <div className="get-bet-values">
                    <p>How do you bet?</p>

                    {/* get the min, max, and starting money */}
                    <div className="min-bet">
                        <label htmlFor='min-bet'>Minimum: </label>
                        <input className="min-bet-input" type="number" min={2} max={10} value={minBet} onChange={changeMinBet}></input>
                        <button onClick={submitMinBet}>Enter</button>
                    </div>

                <br></br>

                <div className="max-bet">
                    <label htmlFor='max-bet'>Maximum:</label>
                    <input className="max-bet-input" type="number" min={10} max={25} value={maxBet} onChange={changeMaxBet}></input>
                    <button onClick={submitMaxBet}>Enter</button>
                </div>

                <br></br>

                <div className="starting-money">
                    <label htmlFor='min-bet'>Starting money: </label>
                    <input className="startingMoney-input" type="number" min={100} max={1000} value={startingMoney} onChange={changeStartingMoney}></input>
                    <button onClick={submitStartingMoney}>Enter</button>
                </div>
            </div>

        </div>
    )
}