import React, {useContext} from "react";
import { AppContext } from "../App"

export default function Key({ keyValue, bigKey, disabled }) {
    const { onDelete, onSelectLetter, onEnter } = useContext(AppContext)

    const selectLetter = () => {
        if (keyValue === "ENTER") {
            onEnter()
        } else if(keyValue === "DELETE") {
            onDelete()
        } else {
            onSelectLetter(keyValue)
        }
    }

    return (
        <div className="keyboard-key" id={ bigKey ? "big": disabled && "disabled"} onClick={selectLetter}>
            {keyValue}
        </div>
    )
}