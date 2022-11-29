import React, { useState, useContext } from 'react'
import { GameContext } from './GamePage'
import { AppContext } from '../App'

export default function GameEnd() {

    const { players, dealer } = useContext(AppContext)
    const { currentBet, currentInformation, currentPlayer, thePot } = useContext(GameContext)

  return (
    <>
        <div className="top-bar">

            { 
            players.map(player => {
                return (
                    <div className="player-stats">
                        <p>{player.name}</p>
                        <p>Money: {player.currentMoney}</p>
                        <p>Current Bet: {currentBet}</p>

                        <div className="player-hand">
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
