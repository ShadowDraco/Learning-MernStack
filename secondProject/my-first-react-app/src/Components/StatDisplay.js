import Axios from "axios"
import React, { useState } from "react"

function StatDisplay(props) {

    console.log(props)

    return (

        <div>
            <h1>{props.datta}</h1>
        </div>
    )
}

export default StatDisplay