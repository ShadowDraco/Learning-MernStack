import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../App'

export default function LoginUser() {

    const {userLoggedIn, setUserLoggedIn, setCurrentUser} = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginAttempted, setLoginAttempted] = useState(false)

    function updateUsername(e) {
        setUsername(e.target.value)
    }

    function updatePassword(e) {
        setPassword(e.target.value)
    }

    function loginSuccess(data) {
        setUserLoggedIn(true)
        setCurrentUser(data)
        setUserLoggedIn(true)
    } 

    function submitLoginUser(e) {
        setLoginAttempted(true)

        axios.post('/api/user/login', { username: username, password: password })
        .then(res => {
            console.log(res.data)
            res.data != false ? loginSuccess(res.data) : setUserLoggedIn(false)
        })
    }

  return (
    <div>
        <div className="container flex column">
            <p className="flex center">Log In!</p>
            <div className="flex center">
                <p>Username:</p>
                <input type='text' value={username} onChange={updateUsername}></input>
            </div>
            <div className="flex center">
                <p>Password:</p>
                <input type='password' value={password} onChange={updatePassword}></input>
            </div>
            <button onClick={submitLoginUser}>Submit!</button>
        </div>
        <div>
        { loginAttempted ? 
            
            userLoggedIn === true ? <p>Success!</p> : <p>Failed to log in!</p>
            
            : ''
        }   
        </div>
    </div>
  )
}
