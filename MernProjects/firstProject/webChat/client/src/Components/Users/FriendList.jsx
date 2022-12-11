import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

import axios from 'axios'
import { ChatContext } from '../Pages/UserPage'

export default function FriendList() {

  const { currentUser } = useContext(UserContext)
  const { setCurrentChatter } = useContext(ChatContext)

  const [friends, setFriends] = useState()

  useEffect(() => {
    updateFriends()
  }, [])

  function updateFriends() {
    axios.get(`/api/user/${currentUser._id}`)
    .then(res => {
      setFriends(res.data.friendList)
    })
  }

  function updateCurrentChatter(e) {
    console.log('setting currentChatter')
    
    axios.get(`/api/user/friend/${friends[e.target.value].friendCode}`)
    .then(res => {
      console.log('got chatter')
      setCurrentChatter(res.data)
    })
  }

  return (
    <div className="container">
      Friends: 
      <br></br>
      <ul className="friend-list flex small-container">
    
        { friends ? 
          friends.map((friend, i) => {
            if (friend.username && friend.friendCode) {
              return ( 
                <li key={friend.friendCode} value={i} onClick={updateCurrentChatter}> {friend.username} </li>
              )
            }
          })
          : console.log('no users to display')
        }
        <button onClick={updateFriends}>Refresh</button>
      </ul>
    </div>
  )
}
