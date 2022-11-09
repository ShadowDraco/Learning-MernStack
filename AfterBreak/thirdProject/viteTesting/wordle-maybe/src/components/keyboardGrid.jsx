import React, {useRef} from "react";

export default function WordGrid({}) {

    const keyboardGrid = useRef();
    
    return (
        <div className="container">
            <div id="keyboard-grid" ref={keyboardGrid}>
                <div className="keyboard-grid-box A">A</div>
                <div className="keyboard-grid-box B">B</div>
                <div className="keyboard-grid-box C">C</div>
                <div className="keyboard-grid-box D">D</div>
                <div className="keyboard-grid-box E">E</div>
                <div className="keyboard-grid-box F">F</div>
                <div className="keyboard-grid-box G">G</div>
                <div className="keyboard-grid-box H">H</div>
                <div className="keyboard-grid-box I">I</div>
                <div className="keyboard-grid-box J">J</div>
                <div className="keyboard-grid-box K">K</div>
                <div className="keyboard-grid-box L">L</div>
                <div className="keyboard-grid-box M">M</div>
                <div className="keyboard-grid-box N">N</div>
                <div className="keyboard-grid-box O">O</div>
                <div className="keyboard-grid-box P">P</div>
                <div className="keyboard-grid-box Q">Q</div>
                <div className="keyboard-grid-box R">R</div>
                <div className="keyboard-grid-box S">S</div>
                <div className="keyboard-grid-box T">T</div>
                <div className="keyboard-grid-box U">U</div>
                <div className="keyboard-grid-box V">V</div>
                <div className="keyboard-grid-box W">W</div>
                <div className="keyboard-grid-box X">X</div>
                <div className="keyboard-grid-box Y">Y</div>
                <div className="keyboard-grid-box Z">Z</div>
            </div>
        </div>
    )
}
