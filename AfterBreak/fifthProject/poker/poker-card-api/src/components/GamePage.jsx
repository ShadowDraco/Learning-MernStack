import axios from 'axios'
import React, { useState, useContext, useEffect} from 'react'
import { GameContext } from '../App'

export default function GamePage() {

    const {players, startingMoney, gameDeck, numberOfPlayers, minBet, maxBet, smallBlind, bigBlind } = useContext(GameContext)

    const [smallBlindPosition, setsmallBlindPosition] = useState(0)
    const [bigBlindPosition, setBigBlindPosition] = useState(1)

    // ante-up, draw-hand, betting, place-flop, place-turn, place-river, showdown, next-player 
    const [gameState, setGameState] = useState(['ante-up'])

    // how many times around the table 
    const [round, setRound] = useState(0)
    // who's turn is it
    const [turn, setTurn] = useState(0)
    // which actions they have completed on their turn
    const [antedUp, setAntedUp] = useState(false)
    const [drewHand, setDrewHand] = useState(false)
    // did this player call, check, or raise yet
    const [didBetAction, setDidBetAction] = useState(false)
    // whether a bet has been placed this round
    const [betStarted, setBetStarted] = useState(false)
    // the person who needs to raise their bet
    const [currentRaiser, setCurrentRaiser] = useState(0)
    const [playerNeedsToRaise, setPlayerNeedsToRaise] = useState(false)
    const [currentBet, setCurrentBet] = useState(0)
    // if the player is trying to raise the bet
    const [prospectiveBet, setProspectiveBet] = useState(currentBet)

    // the current drawn cards for a player
    const [drawnCards, setDrawnCards] = useState ([])
    // current board
    const [board, setBoard] = useState([])
    // current player 
    const [currentPlayer, setCurrentPlayer] = useState(players[turn])
    const [readyForNextPlayer, setReadyForNextPlayer] = useState(false)
    const [betweenTurns, setBetweenTurns] = useState(false)

    useEffect(() => {  
        players[turn].folded ? nextPlayer :
            setCurrentPlayer(players[turn])
            setDrewHand(players[turn].drewHand)
    }, [turn])

    useEffect(() => {
        console.log(round)
        console.log(board)
    }, [round])

    function nextAnte() {
        setsmallBlindPosition(smallBlindPosition + 1)
        setBigBlindPosition(bigBlindPosition + 1)

        smallBlindPosition > numberOfPlayers ? setsmallBlindPosition(0) : console.log('moving little blind to next person')
        bigBlindPosition > numberOfPlayers ? setBigBlindPosition(0) : console.log('moving big blind to next person')
    }

    function anteUp() {

        // subtract the blind from each player
        players.map((p, i) => {
            if (p === currentPlayer) {

                if (p.currentMoney > bigBlind) { 
                    if (i === smallBlindPosition) {
                        p.currentMoney -= smallBlind
                        console.log(`player ${p.name} gave little blind`)

                    } else if(i === bigBlindPosition) {
                        p.currentMoney -= bigBlind
                        console.log(`player ${p.name} gave big blind`)

                    } else {
                        console.log(`player ${p.name} has no blind`)
                    }

                    setAntedUp(true)
                    console.log(currentPlayer.name, 'anted up')
                } else {
                    console.log(`${currentPlayer.name} is out of money`)
                }
                 
            }
        })
    }

    function drawHand(e) {
        antedUp ? 
        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=2`)
        .then(res => {
            setDrawnCards(res.data.cards)
            console.log(`${currentPlayer.name} drew cards`)

            currentPlayer.hand = res.data.cards
            currentPlayer.drewHand = true
            setDrewHand(true)
        })
        :
        console.log('ante up first')
    }

    function disableBets(e) {
        setDidBetAction(true)
    }

    function checkBet(e) {
        console.log(`${currentPlayer.name} checks`)
        disableBets(e)
    }

    function callBet(e) {
        currentPlayer.currentBet = currentBet
        console.log(`${currentPlayer.name} matched bet`)
        disableBets(e)
    }

    function raiseBet(e) {
        let bet = e.target.previousElementSibling.value
        currentPlayer.currentBet = bet
        setCurrentBet(bet)
        setBetStarted(true)
        console.log(`${currentPlayer.name} raised bet`)
        disableBets(e)
    }

    function foldHand(e) {
        setPlayerNeedsToRaise(false)
        currentRaiser.folded = true
    }

    function raiserRaisesBet() {
        currentRaiser.currentBet = currentBet
        setPlayerNeedsToRaise(false)
        console.log(`${currentRaiser.name} updated their bet`)
    }

    function changeProspectiveBet(e) {
        setProspectiveBet(e.target.value)
    }

    function makePlayerRaiseBet(raiser) {
        setCurrentRaiser(players[raiser])
        setPlayerNeedsToRaise(true)
        console.log(`${players[raiser].name} needs to up their bet!`)
    }   

    function readyNextPlayer() {

        if (betStarted) {
            let goodBets = 0
            players.map((p, i) => {
                p.currentBet === currentBet || p.folded === true ? goodBets++ : makePlayerRaiseBet(i)
            })
            console.log(goodBets, numberOfPlayers)
            goodBets === numberOfPlayers ? setBetStarted(false) : console.log('more players should update their bets')
        }
        if (!betStarted && antedUp && drewHand && didBetAction) {

            console.log(`${currentPlayer.name} ending turn`)
            
            setReadyForNextPlayer(true)
            
            setAntedUp(false)
            setDrewHand(false)
            setDidBetAction(false)
            console.log(`${currentPlayer.name} finished their turn`)
        
            nextPlayer()
        } else {
            antedUp ? '' : console.log('ante up')
            drewHand ? '' : console.log('draw your hand')
            didBetAction ? '' : console.log('make or pass your bet!')
        }
    }

    function increaseRound() {
        setRound(round + 1)
        setTurn(0)
        nextAnte()

        round === 0 ? placeFlop() : console.log('') 
        round === 1 ? placeTurn() : console.log('')
        round === 2 ? placeRiver() : console.log('')
        round === 3 ? showDown() : console.log('')
    }

    function nextPlayer() {
        setBetweenTurns(true)
        turn + 1 === numberOfPlayers ? increaseRound() : setTurn(turn + 1)
        console.log('between turns')
    }

    function placeFlop() {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=3`)
        .then(res => {
            setDrawnCards(res.data.cards)
            console.log('the dealer places the flop cards')

            setBoard([...board, drawnCards])
        })

        console.log(board)
    }

    function placeTurn() {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=1`)
        .then(res => {
            setDrawnCards(res.data.cards)
            console.log('the dealer places the turn card')

            setBoard([...board, drawnCards])
        })
    }

    function placeRiver() {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=1`)
        .then(res => {
            setDrawnCards(res.data.cards)
            console.log('the dealer places the river card')

            setBoard([...board, drawnCards])
        })
    }

    function showDown() {
        console.log('all players show their cards')
    }


  return (
    <div className='wrapper'>
        
        <div className="top-bar">
            <div className="player-stats">
                <p>{currentPlayer.name}</p>
                <p>Money: {currentPlayer.currentMoney}</p>
                <p>Current Bet: {currentBet}</p>
                <p>Your Bet: {currentPlayer.currentBet}</p>
            </div>
        </div>

        { playerNeedsToRaise ?
        <div className="bet-raiser"> 
            <p>{currentRaiser.name} please raise your bet to {currentBet} or fold</p>
            <button onClick={raiserRaisesBet}>Stay in!</button>
            <button onClick={foldHand}>Fold out!</button>
        </div>
        : console.log('') }

        <div className="game-board">
            {
                board.map(card => {
                    console.log(card)
                    return(
                        <div key={card.code} className="board-card">
                            <img src={card.image}></img>
                        </div>
                    )
                })
            }
        </div>
        

        <div className="player-hand">
        {
            currentPlayer.hand ? 
            currentPlayer.hand.map(card => {
                return(
                    <div key={card.code} className="player-card">
                        <img src={card.image}></img>
                    </div>
                )
            })
            : console.log('')
        }
        </div>

        <div className="bottom-bar">
            <div className="betting-buttons">
                <input type='number' onChange={changeProspectiveBet} value={prospectiveBet} min={currentBet}></input>
                <button onClick={raiseBet} disabled={didBetAction}>Raise</button>
                <button onClick={callBet} disabled={didBetAction}>Call</button>
                <button onClick={checkBet} disabled={didBetAction}>Check</button>
            </div>
            <div className="ante-buttons">
                <button onClick={anteUp} disabled={antedUp}>Ante Up</button>
            </div>
            <div className="end-turn">
                <button onClick={readyNextPlayer}>End turn</button>
            </div>

            <div className="draw-hand">
                { drewHand ? console.log('player already drew their hand') : <button onClick={drawHand}>Draw Hand</button> }
            </div>
        </div>
    </div>
  )
}
