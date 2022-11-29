import React, { useState, useContext } from 'react'
import { GameContext } from './GamePage'
import { AppContext } from '../App'

export default function DuringGame() {

    const { dealer } = useContext(AppContext)
    const { 
        antedUp, currentBet, currentInformation,
        currentPlayer, drewHand, didBetAction, currentRaiser,
        playerNeedsToRaise, prospectiveBet, thePot,
        readyForShowDown,
        anteUp, readyNextPlayer, raiseBet, raiserRaisesBet, callBet, checkBet, 
        changeProspectiveBet, drawHand, gotoShowDown, foldHand, saveGame
    } = useContext(GameContext)

  return (
    <>
        <div className="top-bar">
            <div className="player-stats">
                <p>{currentPlayer.name}</p>
                <p>Money: {currentPlayer.currentMoney}</p>
                <p>Current Bet: {currentBet}</p>
                <p>Your Bet: {currentPlayer.currentBet}</p>
            </div>

        { playerNeedsToRaise ?
        <div className="bet-raiser"> 
            <p>{currentRaiser.name} please raise your bet to {currentBet} or fold</p>
            <div className="buttons">
                <button onClick={raiserRaisesBet}>Stay in!</button>
                <button onClick={foldHand}>Fold out!</button>
            </div>
        </div>
        : console.log('') }

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
        

        <div className="player-hand">
        {
            currentPlayer.hand ? 
            currentPlayer.hand.map(card => {
                return(
                    <div key={`${card.code}-${Math.random(10)}`} className="player-card">
                        <img src={card.image} className="player-card-img"></img>
                    </div>
                )
            })
            : console.log('')
        }
        </div>

        <div className="showDown">
            { readyForShowDown ? <button onClick={gotoShowDown}>Start Showdown!</button> : console.log('') }
        </div>

        <div className="bottom-bar">

            <div className="ante-button">
                <button onClick={anteUp} disabled={antedUp}>Ante Up</button>
            </div>

            <div className="draw-hand">
                { drewHand ? console.log('') : <button onClick={drawHand}>Draw Hand</button> }
            </div>

            <div className="betting-buttons">
                <div className='raise-button'>
                    <input type='number' onChange={changeProspectiveBet} value={prospectiveBet} min={currentBet}></input>
                    <button onClick={raiseBet} disabled={didBetAction}>Raise</button>
                </div>
                <div className='call-check'>
                    <button className='call-bet' onClick={callBet} disabled={didBetAction}>Call</button>
                    <button className='check-bet' onClick={checkBet} disabled={didBetAction}>Check</button>
                </div>
            </div>

            <div className="end-turn">
                {/* disabled={!(didBetAction && antedUp && drewHand)} */}
                <button onClick={readyNextPlayer} >End turn</button>
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

        <div className="save-game">
            <button onClick={saveGame}>Save Game</button>
        </div>
    </>
  )
}
