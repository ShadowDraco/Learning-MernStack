import React, { useState, useContext} from 'react'
import { GameContext } from '../App'

export default function GamePage() {

    const {players, startingMoney, gameDeck } = useContext(GameContext)
  return (
    <div>GamePage
        {JSON.stringify(players)} <br></br> {JSON.stringify(gameDeck)} <br></br> {startingMoney} <br></br>
    </div>
  )
}
