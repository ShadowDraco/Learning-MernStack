import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

import axios from 'axios'

export default function FriendList() {

  const { currentUser } = useContext(UserContext)

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

  return (
    <div>
      <ul>
        { friends ? 
          friends.map(friend => {
            if (friend.username) {
              return ( 
                <li key={friend.friendCode}>{friend.username}</li>
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
