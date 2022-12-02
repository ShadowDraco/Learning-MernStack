import axios from 'axios'
import React, { useState, useContext, useEffect, createContext} from 'react'
import {v4 as uuidv4} from 'uuid'
import { AppContext } from '../App'

import DuringGame from './DuringGame'
import GameEnd from './GameEnd'

export const GameContext = createContext()

export default function GamePage() {

    const {players, setPlayers, startingMoney, setStartingMoney, gameDeck, setGameDeck, numberOfPlayers, setNumberOfPlayers, minBet, setMinBet, maxBet, setMaxBet, smallBlind, setSmallBlind, bigBlind, setBigBlind, dealer, setDealer, GAMESAVE, setGAMESAVE } = useContext(AppContext)

    const [smallBlindPosition, setSmallBlindPosition] = useState(0)
    const [bigBlindPosition, setBigBlindPosition] = useState(1)

    // ante-up, draw-hand, betting, place-flop, place-turn, place-river, showdown, next-player 
    const [gameState, setGameState] = useState(['ante-up'])
    const [thePot, setThePot] = useState([])
    
    // how many times around the table 
    const [round, setRound] = useState(0)
    // who's turn is it
    const [turn, setTurn] = useState(0)
    // which actions they have completed on their turn
    const [antedUp, setAntedUp] = useState(false)
    const [firstAnte, setFirstAnte] = useState(false)
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

    const [currentInformation, setCurrentInformation] = useState([])
    // end game variables
    const [readyForShowDown, setReadyForShowDown] = useState(false)
    const [inShowDown, setInShowDown] = useState(false)

    // set the state arrays to be non-empty to avoid errors 
    useEffect(() => {
        setCurrentInformation(['Game Just Started'])
        createNewChips(1)
        currentPlayer.drewHand ? setDrewHand(true) : console.log('player did not draw hand')
        
        GAMESAVE ? LOADGAMESAVE() : console.log('starting new game')
    }, [])

    useEffect(() => {  
        // when a new player's turn is started change the variables related to the turn
        players[turn].folded ? nextPlayer() :
            setCurrentPlayer(players[turn])
            setDrewHand(players[turn].drewHand)
    }, [turn])

    function addInformation(newInformation) {
        setCurrentInformation([...currentInformation, newInformation])
    }

    function nextAnte() {
        setSmallBlindPosition(smallBlindPosition + 1)
        setBigBlindPosition(bigBlindPosition + 1)

        smallBlindPosition === numberOfPlayers ? setSmallBlindPosition(0) : addInformation('moving little blind to beginning')
        bigBlindPosition === numberOfPlayers ? setBigBlindPosition(0) : addInformation('moving big blind to beginning')
    }

    function createNewChips(amount) {

        let newChips = []

        for(let i = 0; i < amount; i++) {
            let chipType = Math.floor(Math.random(2) * 10)
            chipType <= 6 ? chipType = 'red-chip' : chipType = 'black-chip'
            
            let newChip = {
                type: chipType,
                id: uuidv4()
            }

            newChips.push(newChip)
        } 

        setThePot([...thePot, ...newChips])

    }

    function anteUp() {

        // subtract the blind from each player
        players.map((p, i) => {
            if (p === currentPlayer) {

                if (p.currentMoney > bigBlind) { 
                    if (i === smallBlindPosition) {
                        p.currentMoney -= smallBlind
                        createNewChips(smallBlind)
                        addInformation(`Player ${p.name} gave little blind`)

                    } else if(i === bigBlindPosition) {
                        p.currentMoney -= bigBlind
                        createNewChips(bigBlind)
                        addInformation(`Player ${p.name} gave big blind`)

                    } else {
                        addInformation(`Player ${p.name} has no blind`)
                    }

                    setAntedUp(true)
                    setFirstAnte(true)
                } else {
                    addInformation(`${currentPlayer.name} is out of money`)
                }
                 
            }
        })
    }

    function drawHand(e) {
        antedUp ? 
        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=2`)
        .then(res => {
            setDrawnCards(res.data.cards)
            addInformation(`${currentPlayer.name} drew cards`)

            currentPlayer.hand = res.data.cards
            currentPlayer.drewHand = true
            setDrewHand(true)
        })
        :
        addInformation('Please ante up first')
    }

    function disableBets(e) {
        setDidBetAction(true)
    }

    function checkBet(e) {
        if (antedUp && drewHand) {
            addInformation(`${currentPlayer.name} checks`)
            disableBets(e)
        } else {
            antedUp ? console.log('') : addInformation('Please ante up')
            drewHand ? console.log('') : addInformation('Please draw your hand')
        }
    }

    function callBet(e) {
        if (antedUp && drewHand) {
            currentPlayer.currentBet = currentBet
            addInformation(`${currentPlayer.name} matched bet`)
            disableBets(e)
        } else {
            antedUp ? console.log('') : addInformation('Please ante up')
            drewHand ? console.log('') : addInformation('Please draw your hand')
        }
    }

    function raiseBet(e) {
        let bet = e.target.previousElementSibling.value
        
        if (bet > currentBet) {

            if (antedUp && drewHand) {
                currentPlayer.currentBet = bet
                setCurrentBet(bet)
                setBetStarted(true)
                addInformation(`${currentPlayer.name} raised bet`)
                disableBets(e) 
            } else {
                antedUp ? console.log('') : addInformation('Please ante up')
                drewHand ? console.log('') : addInformation('Please draw your hand')
            }
        }
        else {
            addInformation('please place a higher bet')
        }
    }

    function foldHand(e) {
        setPlayerNeedsToRaise(false)
        currentRaiser.folded = true
    }

    function raiserRaisesBet() {
        currentRaiser.currentBet = currentBet
        setPlayerNeedsToRaise(false)
        addInformation(`${currentRaiser.name} updated their bet`)
    }

    function changeProspectiveBet(e) {
        setProspectiveBet(e.target.value)
    }

    function makePlayerRaiseBet(raiser) {
        setCurrentRaiser(players[raiser])
        setPlayerNeedsToRaise(true)
        addInformation(`${players[raiser].name} needs to up their bet!`)
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

            addInformation(`${currentPlayer.name} ending turn`)
            
            setReadyForNextPlayer(true)
            
            setAntedUp(false)
            setDrewHand(false)
            setDidBetAction(false)
            console.log(`${currentPlayer.name} finished their turn`)
        
            nextPlayer()
        } else {
            antedUp ? '' : addInformation('Please ante up')
            drewHand ? '' : addInformation('Please draw your hand')
            didBetAction ? '' : addInformation('Please make or pass your bet!')
        }
    }

    function increaseRound() {
        setRound(round + 1)
        setTurn(0)
        nextAnte()

        round === 0 ? placeFlop() : console.log('') 
        round === 1 ? placeTurn() : console.log('')
        round === 2 ? placeRiver() : console.log('')
        round === 3 ? beginShowDown() : console.log('')
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
            addInformation('The dealer places the flop cards')

            setBoard([...board, res.data.cards])
            dealer.hand = res.data.cards
        })

    }

    function placeTurn() {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=1`)
        .then(res => {
            setDrawnCards(res.data.cards)
            addInformation('The dealer places the turn card')

            setBoard([...board, res.data.cards])
            dealer.hand.push(res.data.cards[0])
        })
    }

    function placeRiver() {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=1`)
        .then(res => {
            setDrawnCards(res.data.cards)
            addInformation('The dealer places the river card')

            setBoard([...board, res.data.cards])
            dealer.hand.push(res.data.cards[0])
        })
    }

    function beginShowDown() {
        addInformation('All players show their cards for the showdown')
        setReadyForShowDown(true)
    }

    function gotoShowDown() {
        setInShowDown(true)
    }

    function saveGame() {
        const GAMESAVE = {
            players: players,
            currentBet: currentBet,
            currentInformation: currentInformation,
            antedUp: antedUp, 
            drawnCards: drawnCards,
            gameDeck: gameDeck, 
            board: board,
            inShowDown: inShowDown,
            playerNeedsToRaise: playerNeedsToRaise,
            currentRaiser: currentRaiser,
            drewHand: drewHand,
            didBetAction: didBetAction, 
            thePot: thePot,
            prospectiveBet: prospectiveBet,
            readyForShowDown: readyForShowDown,
            readyForNextPlayer: readyForNextPlayer,
            round: round, 
            turn: turn,
            betStarted: betStarted,
            smallBlindPosition: smallBlindPosition,
            bigBlindPosition: bigBlindPosition,
            betweenTurns: betweenTurns,
            firstAnte: firstAnte,
            startingMoney: startingMoney,
            minBet: minBet,
            maxBet: maxBet,
            smallBlind: smallBlind,
            bigBlind: bigBlind,
            dealer: dealer,
        }
        localStorage.setItem('GAMESAVE', JSON.stringify(GAMESAVE))
        setGAMESAVE(GAMESAVE)
    }

    function LOADGAMESAVE() {
        const GAMESAVE = JSON.parse(localStorage.getItem('GAMESAVE'))
        console.log('loading game save!')
        setPlayers(GAMESAVE.players)
        setCurrentBet(GAMESAVE.currentBet)
        setCurrentInformation(GAMESAVE.currentInformation)
        setAntedUp(GAMESAVE.antedUp)
        setDrawnCards(GAMESAVE.drawnCards)
        setGameDeck(GAMESAVE.gameDeck)
        setBoard(GAMESAVE.board)
        setInShowDown(GAMESAVE.inShowDown)
        setPlayerNeedsToRaise(GAMESAVE.playerNeedsToRaise)
        setCurrentRaiser(GAMESAVE.currentRaiser)
        setDrewHand(GAMESAVE.drewHand)
        setDidBetAction(GAMESAVE.didBetAction)
        setThePot(GAMESAVE.thePot)
        setProspectiveBet(GAMESAVE.prospectiveBet)
        setReadyForShowDown(GAMESAVE.readyForShowDown)
        setReadyForNextPlayer(GAMESAVE.readyForNextPlayer)
        setRound(GAMESAVE.round)
        setTurn(GAMESAVE.turn)
        setBetStarted(GAMESAVE.betStarted)
        setSmallBlindPosition(GAMESAVE.smallBlindPosition)
        setBigBlindPosition(GAMESAVE.bigBlindPosition)
        setBetweenTurns(GAMESAVE.betweenTurns)
        setFirstAnte(GAMESAVE.firstAnte)
        setStartingMoney(GAMESAVE.startingMoney)
        setMinBet(GAMESAVE.minBet)
        setMaxBet(GAMESAVE.maxBet)
        setSmallBlind(GAMESAVE.smallBlind)
        setBigBlind(GAMESAVE.bigBlind)
        setDealer(GAMESAVE.dealer)

        addInformation('Loaded saved game!')
    }


  return (

    <div className='wrapper'> 

    <GameContext.Provider 
    value={{
        antedUp, currentBet, currentInformation,
        currentPlayer, drewHand, didBetAction, currentRaiser,
        playerNeedsToRaise, prospectiveBet, thePot,
        readyForShowDown,
        anteUp, readyNextPlayer, raiseBet, raiserRaisesBet, callBet, checkBet, 
        changeProspectiveBet, drawHand, gotoShowDown, foldHand, saveGame
    }}>
        {
            !inShowDown ? <DuringGame /> : <GameEnd />
        }
    </GameContext.Provider>
    </div>
  )
}
