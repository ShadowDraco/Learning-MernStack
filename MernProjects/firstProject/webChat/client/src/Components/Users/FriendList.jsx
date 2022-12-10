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
      setFriends(res.data)
    })
  }

  function updateCurrentChatter(e) {
    console.log('setting currentChatter')
    console.log(e.target)
    axios.get(`/api/user/friend/${e.target.value}`)
    .then(res => {
      console.log('got chatter')
      console.log(res.data)
      setCurrentChatter(res.data)
    })
  }

  return (
    <div>
      <ul>
        { friends ? 
          friends.map(friend => {
            if (friend.username && friend.friendCode) {
              return ( 
                <li key={friend.friendCode} onClick={updateCurrentChatter}>{friend.username} <p style={{display: "none"}} value={friend.friendCode}>{friend.friendCode}</p></li>
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
