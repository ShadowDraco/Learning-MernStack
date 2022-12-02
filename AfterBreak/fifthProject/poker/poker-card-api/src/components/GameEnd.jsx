import React, { useState, useContext } from 'react'
import { GameContext } from './GamePage'
import { AppContext } from '../App'

export default function GameEnd() {

    const { players, dealer } = useContext(AppContext)
    const { currentBet, currentInformation, currentPlayer, thePot } = useContext(GameContext)

    /* get the select's current value and set the player's condition */ 
    function changeWinCondition(e, player) {
        console.log(player)
        player.winCondition = e.target.value
    }

    function makePlayerWin(e) {
        let winner = e.target.previousElementSibling.value
        winner.money += thePot
        winner.winCount++
        
    }

  return (
    <>
        <div className="top-bar-game-end">

            { 
            players.map(player => {
                return (
                    <div className="player-stats">
                        <div className='stats'>
                            <p>{player.name}</p>
                            <p>Money: {player.currentMoney}</p>
                            <p>Current Bet: {currentBet}</p>

                            <div className="selectHand">
                                <select onChange={(e) => {
                                    changeWinCondition(e, player)
                                }}>
                                    <option value="high-card">High Card</option>
                                    <option value="pair">Pair</option>
                                    <option value="two-pair">Two pair</option>
                                    <option value="three-kind">Three of a kind</option>
                                    <option value="straight">Straight</option>
                                    <option value="flush">Flush</option>
                                    <option value="full-house">Full House</option>
                                    <option value="four-kind">Four of a kind</option>
                                    <option value="straight-flush">Straight Flush</option>
                                    <option value="royal-flush">Royal Flush</option>
                                </select>
                            </div>

                        </div>

                        <div className="player-hand-game-end">
                            {
                                player.hand.map(card => {
                                    return(
                                        <div key={`${card.code}-${Math.random(10)}`} className="player-card">
                                            <img src={card.image} className="player-card-img"></img>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div> 
                )
            })
            }

        </div>


        <div className="game-board">
            {
               dealer.hand ? dealer.hand.map(card => {
                    return(
                        <div key={`${card.code}-${Math.random(10)}` } className="board-card">
                            <img src={card.image} className="board-card-img"></img>
                        </div>
                    )
                })
                : console.log('')
            }

            <div className="chip-container">
            {
                thePot ? thePot.map(chip => {
                    return(
                        <div key={`chip ${chip.id}`} className='chip'>
                            <img src={`./src/images/${chip.type}.png`}></img>
                        </div>
                    )
                }) : console.log('no chips')
            }
            </div>
        </div>
    

        <div className="bottom-bar">
            <div className="who-won">
                <select className='winner-list'>
                    {
                        players.map(player => {
                            return (
                                <option value={player}>{player.name}</option>
                            )
                        })
                    }
                </select>

                <p>I WONN!!</p>

                <button onClick={makePlayerWin}>Submit</button>
            </div>
        </div>

        <div className="information-bar">
            <div className="information">
                {
                    currentInformation ? (currentInformation.length < 6) ? 
                        currentInformation.map(info => {
                            return ( 
                                <div key={`info ${Math.random(10)}`} className='info'>{info}</div>
                            )
                        })
                    : currentInformation.slice(-5).map((info) => {
                        return ( 
                            <div key={`info ${Math.random(10)}`} className='info'>{info}</div>
                        )
                    })
                    : console.log('')
                }
            </div>
        </div>
    </>
  )
}
