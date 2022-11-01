import React from 'react'
import '../App.css'

function Navbar() { 
    return (
        <nav class="nav bg-dark-gradient"> 

            <p class="nav-brand">Second!</p>

            <ul class="list-group bg-dark">
                <li class="list-group-item"><a href="/home">Home</a></li>
                <li class="list-group-item"><a href="/pricing">Pricing</a></li>
                <li class="list-group-item"><a href="/about">About</a></li>
            </ul>

        </nav>
    )
}

export default Navbar