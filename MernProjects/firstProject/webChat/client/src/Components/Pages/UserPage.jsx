import React, { useState, useContext, createContext } from 'react'
import { UserContext } from '../../App'
import FriendsList from '../Users/FriendList'
import AddFriend from '../Users/AddFriend'
import Chatbox from '../Users/Chatbox'

export const ChatContext = createContext()

export default function UserPage() {

    const { currentUser } = useContext (UserContext)
    const [currentChatter, setCurrentChatter] = useState()

  return (
    <div className="container flex column center">
        <h1> Welcome! { currentUser.username } </h1>

        <ChatContext.Provider value={{ currentChatter, setCurrentChatter}}>
          
          <div className="small-container flex center">
            <AddFriend />
            <FriendsList />
          </div>

          <Chatbox />

        </ChatContext.Provider>
        
    </div>
  )
}
