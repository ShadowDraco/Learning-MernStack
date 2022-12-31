import { useContext, useState } from "react"
import axios from "axios"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { UserContext } from "../../App"

export default function AddItemButton() {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [playingAnimation, setPlayingAnimation] = useState(false)
  const [spinnerVariant, setSpinnerVariant] = useState("success")

  async function addItem() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    try {
      console.log("adding item")
      setSpinnerVariant("success") // change spinner to green

      let requestedItem
      await axios.get("https://pokeapi.co/api/v2/item/ultra-ball").then(res => {
        requestedItem = res.data
        requestedItem.quantity = 20
      })

      axios
        .post("http://localhost:5000/user/add-item", {
          user: currentUser,
          item: requestedItem,
          quantity: requestedItem.quantity,
        })
        .then(res => {
          console.log("finished add item request")
          console.log(res.data)
          setCurrentUser(res.data.updatedUser)

          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error while saving")
      setSpinnerVariant("danger") // set spinner to red

      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Container className="flex">
      <Button className="btn-sm btn-dark" onClick={addItem}>
        Add Item!
      </Button>
      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
    </Container>
  )
}

/* 

item: {
            name: "beal-berry",
            description: "heals 10 hp",
            function: "heal",
            function_amount: 10,
            quantity: 1,
          },

*/
