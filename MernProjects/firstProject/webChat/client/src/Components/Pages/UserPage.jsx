import React, { useContext } from 'react'
import { UserContext } from '../../App'
import FriendsList from '../Users/FriendList'
import AddFriend from '../Users/AddFriend'

export default function UserPage() {

    const { currentUser } = useContext (UserContext)

  return (
    <div>
        <h1> Welcome! { currentUser.username } </h1>
        <FriendsList />    
        <AddFriend />
    </div>
  )
}
