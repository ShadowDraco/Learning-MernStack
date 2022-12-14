import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../App'

export default function AddFriend() {

    const { currentUser } = useContext(UserContext)

    const [friendCode, setFriendCode] = useState('')
    const [addedFriend, setAddedFriend] = useState()

    function updateFriendCode(e) {
        setFriendCode(e.target.value)
    }

    function submitFriendCode(e) {
        setAddedFriend(true)
        axios.post('/api/user/add-friend', { currentUser: currentUser, friendCode: friendCode })
        .then(res => {
            console.log(res.data)
        })
    }

  return (
    <div className="container flex column">
        <p>Add Friends by ID:</p>
        <div className="small-container">
            <input type="text" onChange={updateFriendCode}></input>
            <button onClick={submitFriendCode}>Add Friend</button>
        </div>
        { addedFriend ? 
            addedFriend === true ? <p>Success!</p>
            : <p>Failed to add friend!</p>
            : ''
        }
        <p>My Code: {currentUser.friendCode}</p>
    </div>
  )
}
