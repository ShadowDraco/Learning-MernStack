import React, { useEffect, useCallback, useContext } from "react";
import { AppContext } from "../App";
import Key from './Key'

export default function Keyboard() {
    
    const {onEnter, onDelete, onSelectLetter, disabledLetters } = useContext(AppContext)

    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]

    const allKeys = keys1.concat(keys2, keys3)

    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter") {
            onEnter()
        } else if (event.key === "Backspace") {
            onDelete()
        } else {
            allKeys.forEach((key) => {
                if (event.key.toUpperCase() === key) {
                    onSelectLetter(key)
                }
            })
        }
    })

    useEffect(() => {   
        document.addEventListener("keydown", handleKeyboard)
        return () => {
            document.removeEventListener("keydown", handleKeyboard)
        }
    }, [handleKeyboard])

    return (
        <div className="keyboard" onKeyDown={ handleKeyboard }>
            <div className="keyboard-line line1">
                { keys1.map((key) => {
                    return( <Key keyValue={key} disabled={disabledLetters.includes(key)}/> )
                })}
            </div>
            <div className="keyboard-line line2">
                { keys2.map((key) => {
                    return( <Key keyValue={key} disabled={disabledLetters.includes(key)}/> )
                })}
            </div>
            <div className="keyboard-line line3">
                <Key keyValue={"ENTER"} bigKey={true} />
                
                { keys3.map((key) => {
                    return( <Key keyValue={key} disabled={disabledLetters.includes(key)}/> )
                })}

                <Key keyValue={"DELETE"} bigKey={true} />
            </div>
        </div>
    )
}