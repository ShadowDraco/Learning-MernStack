import React, { useContext } from "react";
import { AppContext } from "../App"

export default function GameOver() {
    const { gameOver, setGameOver, correctWord, currentAttempt } = useContext(AppContext)
    return (
        <div className="gameOver">
            <div>
                <h3> {gameOver.guessedWord ? "You Correctly Guessed!" : "You Failed!" }</h3>
                <h1>Correct: {correctWord}</h1>
                {gameOver.guessedWord && (
                    <h3>You guessed in { currentAttempt.attempt } attempts </h3>
                )}
            </div>
        </div>
    )
}