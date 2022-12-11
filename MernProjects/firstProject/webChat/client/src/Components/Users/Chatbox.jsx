import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { ChatContext } from '../Pages/UserPage'
import axios from 'axios'

export default function Chatbox() {

    const { currentChatter } = useContext(ChatContext)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [messageToSend, setMessageToSend] = useState('')

    useEffect(() => {
        currentChatter ? console.log('successful getting chatter') : console.log('no chatter yet')
        axios.get(`/api/user/${currentUser._id}`)
        .then(res => {
            setCurrentUser(res.data)
        })
    }, [currentChatter])

    function updateMessageToSend(e) {
        setMessageToSend(e.target.value)
    }

    function sendMessage(e) {
        console.log('sending message')
        axios.post(`/api/user/message`, { user: currentUser._id, friend: currentChatter.friendCode, message: messageToSend })
        .then(res => {
            axios.get(`/api/user/${currentUser._id}`)
            .then(res => {
                setCurrentUser(res.data)
            })
        })
    }

  return (
    <div>
        { currentChatter ? 
            <div> 
                <p>Chat with selected user: { currentChatter.username  } </p>
                <div>
                    <ul>
                    { currentUser.messages ? 
                    currentUser.messages.map(message => {
                        return(
                            <li key={message.message}>{message.from}: {message.message}</li>
                        )
                    })
                    : ''
                    }
                    </ul>
                </div>

                <div>
                    <p>Send message: </p>
                    <input onChange={updateMessageToSend} value={messageToSend}></input>  
                    <button onClick={sendMessage}>Send!</button>              
                </div>
            </div>
            : ''
        }
        
    </div>
  )
}
