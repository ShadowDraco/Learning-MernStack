import axios from 'axios'
import React, { useState, useContext, useEffect, createContext} from 'react'
import {v4 as uuidv4} from 'uuid' // uuid generates unique key id's for child react components
import { AppContext } from '../App'

import DuringGame from './DuringGame'
import GameEnd from './GameEnd'

export const GameContext = createContext()

export default function GamePage() {

    const {players, setPlayers, startingMoney, setStartingMoney, gameDeck, setGameDeck, numberOfPlayers, setNumberOfPlayers, minBet, setMinBet, maxBet, setMaxBet, smallBlind, setSmallBlind, bigBlind, setBigBlind, dealer, setDealer, GAMESAVE, setGAMESAVE } = useContext(AppContext)

    // the index of the blinds to trrack which player needs to give an ante
    const [smallBlindPosition, setSmallBlindPosition] = useState(0)
    const [bigBlindPosition, setBigBlindPosition] = useState(1)

    // ante-up, draw-hand, betting, place-flop, place-turn, place-river, showdown, next-player 
    const [gameState, setGameState] = useState(['ante-up']) // unused was mostly a thought process which helped me decide how to actually manage the state of my game. I realized that state was managing itself... hahaha
    const [thePot, setThePot] = useState([]) // all the chips on the board
    
    // how many times around the table 
    const [round, setRound] = useState(0)
    // who's turn is it
    const [turn, setTurn] = useState(0)
    // which actions they have completed on their turn
    const [antedUp, setAntedUp] = useState(false)
    const [firstAnte, setFirstAnte] = useState(false) // an extra variable to prevent possible first turn errors
    const [drewHand, setDrewHand] = useState(false)
    // did this player call, check, or raise yet
    const [didBetAction, setDidBetAction] = useState(false)
    // whether a bet has been placed this round
    const [betStarted, setBetStarted] = useState(false)
    // the person who needs to raise their bet
    const [currentRaiser, setCurrentRaiser] = useState(0)
    const [playerNeedsToRaise, setPlayerNeedsToRaise] = useState(false)
    const [currentBet, setCurrentBet] = useState(0) // the current amount of chips that have been bet on top of the ante this game
    // if the player is trying to raise the bet
    const [prospectiveBet, setProspectiveBet] = useState(currentBet) // variable to store onChange of the raise bet input

    // the current drawn cards for a player
    const [drawnCards, setDrawnCards] = useState ([])
    // current board
    const [board, setBoard] = useState([])
    // current player 
    const [currentPlayer, setCurrentPlayer] = useState(players[turn])
    const [readyForNextPlayer, setReadyForNextPlayer] = useState(false) // when switching turns hide cards behind a button
    const [betweenTurns, setBetweenTurns] = useState(false) // ^ some way to allow people to 'pass' the screen around

    const [currentInformation, setCurrentInformation] = useState([])
    // end game variables
    const [readyForShowDown, setReadyForShowDown] = useState(false)
    const [inShowDown, setInShowDown] = useState(false)

    // set the state arrays to be non-empty to avoid errors 
    useEffect(() => {
        // set important beginning content so the game doesn't break
        setCurrentInformation(['Game Just Started'])
        createNewChips(1)
        
        // if there is a game save just load that over top
        GAMESAVE ? LOADGAMESAVE() : console.log('starting new game')
    }, [])

    useEffect(() => {  
        // when a new player's turn is started change the variables related to the turn
        players[turn].folded ? nextPlayer() :
            setCurrentPlayer(players[turn])
            setDrewHand(players[turn].drewHand)
    }, [turn])

    // update the bottom information textbox
    function addInformation(newInformation) {
        setCurrentInformation([...currentInformation, newInformation])
    }

    // move the blinds around the table
    function nextAnte() {
        setSmallBlindPosition(smallBlindPosition + 1)
        setBigBlindPosition(bigBlindPosition + 1)

        smallBlindPosition === numberOfPlayers ? setSmallBlindPosition(0) : addInformation('moving little blind to beginning')
        bigBlindPosition === numberOfPlayers ? setBigBlindPosition(0) : addInformation('moving big blind to beginning')
    }

    // add chips to the board without breaking state by setting to an array and then updating the state after
    function createNewChips(amount) {

        let newChips = []

        for(let i = 0; i < amount; i++) {
            let chipType = Math.floor(Math.random(2) * 10)
            chipType <= 6 ? chipType = 'red-chip' : chipType = 'black-chip'
            // create a random red or black chip and give it an id
            
            let newChip = {
                type: chipType,
                id: uuidv4()
            }

            newChips.push(newChip)
        } 
        // add the variable list to the state because state can't update in a loop
        setThePot([...thePot, ...newChips])

    }

    function anteUp() {

        // subtract the blind from each player
        players.map((p, i) => {
            if (p === currentPlayer) {

                // if the player has enough money
                if (p.currentMoney > bigBlind) { 
                    // if the current index is equal to the blind position make them pay
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
        // if the player is anted up let them draw cards
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

    // disable the betting buttons all at once with state
    function disableBets(e) {
        setDidBetAction(true)
    }

    /* 
        List of BET actions 
    */
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


    // if the player doesn't want to raise their bet they are skipped until the game ends and that's it
    function foldHand(e) {
        setPlayerNeedsToRaise(false)
        currentRaiser.folded = true
    }
    // ask players to raise their bet without forcing the screen to be passed around by prompting the current Player
    function raiserRaisesBet() {
        currentRaiser.currentBet = currentBet
        setPlayerNeedsToRaise(false)
        addInformation(`${currentRaiser.name} updated their bet`)
    }
    // raise bet input's onChange function  
    function changeProspectiveBet(e) {
        setProspectiveBet(e.target.value)
    }
    // button onClick for stay in and raise the bet
    function makePlayerRaiseBet(raiser) {
        setCurrentRaiser(players[raiser])
        setPlayerNeedsToRaise(true)
        addInformation(`${players[raiser].name} needs to up their bet!`)
    }   

    // when end turn is pressed see what needs to be done
    function readyNextPlayer() {

        // if a bet is started check who needs to raise
        if (betStarted) {
            let goodBets = 0
            players.map((p, i) => {
                p.currentBet === currentBet || p.folded === true ? goodBets++ : makePlayerRaiseBet(i)
            })

            goodBets === numberOfPlayers ? setBetStarted(false) : addInformation('More players should update their bets')
        }
        // if everything else is done then reset the start for the turn and move to the next Player
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

    // when all players have their turn the dealer does theirs
    function increaseRound() {
        setRound(round + 1)
        setTurn(0)
        nextAnte()

        round === 0 ? placeFlop() : console.log('') 
        round === 1 ? placeTurn() : console.log('')
        round === 2 ? placeRiver() : console.log('')
        round === 3 ? beginShowDown() : console.log('')
    }

    // increase the turn and check the round
    function nextPlayer() {
        setBetweenTurns(true)
        turn + 1 === numberOfPlayers ? increaseRound() : setTurn(turn + 1)
        console.log('between turns')
    }

    /*
        List of DEALER actions
    */
   // mostly just place cards and keep track of them
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

    /* 
        End GAME things
    */

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
        sessionStorage.setItem('players', JSON.stringify(players))
        setGAMESAVE(GAMESAVE)
        addInformation('Saved - ')
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

    function savePlayersResetGame() {

        players.map(player => {
            player.hand = ''
            player.drewHand = ''
            player.currentbet = ''
        })

        dealer.hand = ''

        axios.get(`https://www.deckofcardsapi.com/api/deck/${gameDeck.deck_id}/shuffle/`)
        .then(res => {
            setGameDeck(res.data)
            sessionStorage.setItem('gameDeck', JSON.stringify(res.data))
        })  

        const GAMESAVE = {
            players: players,
            minBet: minBet,
            maxBet: maxBet,
            smallBlind: smallBlind,
            bigBlind: bigBlind,
            dealer: dealer,
        }

        localStorage.setItem('GAMESAVE', JSON.stringify(GAMESAVE))
        sessionStorage.setItem('players', JSON.stringify(players))
        setGAMESAVE(GAMESAVE)

        addInformation('Saved - Start a fresh game!')

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
        changeProspectiveBet, drawHand, gotoShowDown, foldHand, saveGame, savePlayersResetGame
    }}>
        {
            !inShowDown ? <DuringGame /> : <GameEnd />
        }
    </GameContext.Provider>
    </div>
  )
}
