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

  const [itemToAdd, setItemToAdd] = useState("")
  const [quantityToAdd, setQuantityToAdd] = useState(1)

  async function addItem() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    try {
      console.log("adding item")
      setSpinnerVariant("success") // change spinner to green

      let requestedItem
      await axios
        .get(`https://pokeapi.co/api/v2/item/${itemToAdd}`)
        .then(res => {
          requestedItem = res.data
          requestedItem.quantity = quantityToAdd
        })

      await axios
        .post("http://localhost:5000/user/add-item-to-bag", {
          user: currentUser,
          item: requestedItem,
          quantity: quantityToAdd,
        })
        .then(res => {
          console.log("finished add item request")
          setCurrentUser(res.data.updatedUser)

          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error requesting item")
      setSpinnerVariant("danger") // set spinner to red

      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  function changeItemToAdd(e) {
    setItemToAdd(e.target.value)
  }
  function changeQuantityToAdd(e) {
    setQuantityToAdd(parseInt(e.target.value))
  }

  return (
    <Container className="flex m-0 w-auto">
      <input
        style={{ width: "3rem" }}
        value={quantityToAdd}
        onChange={changeQuantityToAdd}
        placeholder="Amount:"
        type="number"
      ></input>
      <input
        style={{ width: "5rem" }}
        value={itemToAdd}
        onChange={changeItemToAdd}
        placeholder="Item:"
      ></input>
      {playingAnimation ? (
        <Spinner animation="grow" variant={spinnerVariant} />
      ) : (
        ""
      )}
      <Button className="btn-sm btn-secondary" onClick={addItem}>
        Add Item!
      </Button>
    </Container>
  )
}
