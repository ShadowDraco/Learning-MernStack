import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { ChatContext } from '../Pages/UserPage'

export default function Chatbox() {

    const { currentChatter } = useContext(ChatContext)
    const { currentUser } = useContext(UserContext)

    const [messageToSend, setMessageToSend] = useState('')

    useEffect(() => {
        currentChatter ? console.log(currentChatter) : console.log('no chatter yet')
    }, [currentChatter])

    function updateMessageToSend(e) {
        setMessageToSend(e.target.value)
    }

    function sendMessage(e) {
        console.log('sending message')
        axios.post(`/${currentUser._id}/${currentChatter.friendCode}/${messageToSend}`)
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
                            <li>{message.from} ': ' {message.text}</li>
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
