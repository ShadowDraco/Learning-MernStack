import React, { useContext, useEffect, useState } from "react";
import { AppContext} from '../App'

export default function Letter({letterPos, attemptValue}) {

    const { board, correctWord, currentAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext)
    const letter = board[attemptValue][letterPos]

    // if the letter at the same position as THIS letter is the same as THIS letter
    const correct = correctWord.toUpperCase()[letterPos] === letter
    // if its not correct, and not empty, but the correct word includes THIS letter
    const almost = !correct && letter !== "" && correctWord.includes(letter)
    // only set the letter colors after you press enter
    const letterState = currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "wrong")
    
    useEffect(() => {
        // if the letter is not in the word at all
        if (letter !== "" && !correct && !almost) {
            // add this letter to the array
            setDisabledLetters((prev) => [...prev, letter])
        }
    }, [currentAttempt.attempt])

    return(
        <div className="letter" id={letterState}>{ letter } </div>
    )
}