import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { ChatContext } from '../Pages/UserPage'
import axios from 'axios'

export default function Chatbox() {

    const { currentChatter } = useContext(ChatContext)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [messageToSend, setMessageToSend] = useState('')
    const [currentChatCode, setCurrentChatCode] = useState()

    useEffect(() => {
        updateUser()
    }, [])

    useEffect(() => {
        getChatCode()
    }, [currentChatter])


// setinterval(updateUszer)

    function updateUser() {
        axios.get(`/api/user/${currentUser._id}`)
        .then(res => {
            setCurrentUser(res.data)
        })
    }

    function updateMessageToSend(e) {
        setMessageToSend(e.target.value)
    }

    function sendMessage(e) {
        console.log('sending message')
        axios.post(`/api/user/message`, { user: currentUser._id, friend: currentChatter.friendCode, message: messageToSend })
        .then(res => {
            updateUser()
        })
    }

    function getChatCode() {
        console.log('getting chat code')
        currentUser.chatCodes ? 
        currentUser.chatCodes.map((code, i) => {
            i > 0 ?
            code.friend.friendCode === currentChatter.friendCode ? setCurrentChatCode(code.code) : ''
            : ''
        })
        : ''
    }

  return (
    <div className="container chatbox">
        { currentChatter ? 
            <div className="container"> 

                <div className="small-container">
                    
                    <p>Chat with selected user: { currentChatter.username  } </p>

                    <ul className="messages">
                    { currentUser.messages ? 
                        currentChatCode ? 
                            currentUser.messages.map((message, i) => {
                
                                return (
                                    message.chatCode === currentChatCode ? 
                                    i > 0 ? <li key={`${Math.random(10)} ${message.message}`} className={`${message.from === currentUser.username ? 'my-message' : 'friend-message'} flex`}><p>{message.message}</p></li>
                                    : '' : ''
                                )
                            })
                    : 'no chat code' : ''
                    }
                    </ul>
                </div>

                <div className="small-container">
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
