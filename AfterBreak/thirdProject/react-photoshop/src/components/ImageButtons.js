import React, { useState } from "react";

export default function ImageButtons({changeImage}) {

    return (
        <div className="image-buttons">
            <button className="sidebar-item button1" onClick={event => changeImage(0)}>Image One</button>
            <button className="sidebar-item button2" onClick={event => changeImage(1)}>Image Two</button>
            <button className="sidebar-item button3" onClick={event => changeImage(2)}>Image Three</button>
        </div>    
    )
}
