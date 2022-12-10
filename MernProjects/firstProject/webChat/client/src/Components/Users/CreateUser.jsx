import React, { useState } from 'react'
import axios from 'axios'

export default function () {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [userCreated, setUserCreated] = useState()


    function updateUsername(e) {
        setUsername(e.target.value)
    }

    function updatePassword(e) {
        setPassword(e.target.value)
    }

    function submitNewUser(e) {
        axios.post('/api/user/create', { username: username, password: password })
        .then(res => {
            console.log(res.data.created)
            setUserCreated(res.data.created)
        })
    }

  return (
    <div>
        <div>
            <p>Sign up!</p>
            <input type='text' value={username} onChange={updateUsername}></input>
            <input type='password' value={password} onChange={updatePassword}></input>
            <button onClick={submitNewUser}>Submit!</button>
        </div>
        <div>
        { userCreated ? 
            
            userCreated === true ? <p>Success!</p> : console.log(userCreated)
            
            : ''
        }   
        </div>
    </div>
  )
}
