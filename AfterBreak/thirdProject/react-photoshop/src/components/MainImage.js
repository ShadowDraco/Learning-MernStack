import React from "react";

export default function MainImage(props) {
    
    return (
        <div className="main-image" style={props.style}>
            <img src={props.image} alt="Image being edited" />
        </div>
    )
}