import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const Cart = ({ cart, setCart, totalPrice, setTotalPrice, updatedPrice, setUpdatedPrice, onClick }) => {
  // const [ cart, setCart ] = useState([])
  const {data: cartData, error, isPending} = useFetch('http://localhost:1337/carts/');

  console.log(`cartData`, cartData)

  useEffect( () => {
    if (cartData) setCart(cartData)
  }, [cartData])

  return (
    <div>
      <hr />
      <h3 className="center-this">Total Price: {updatedPrice}</h3>

      <hr />
      <h4 className="center-this">Cart</h4>
      <div className="cart-container">
        {cartData && cart.length > 0 ? cart.map((currCart) => {
          totalPrice = totalPrice + currCart.price
          setUpdatedPrice(totalPrice)

          return (
            <div key={currCart.key} className="cart"
              onClick={() => onClick(currCart.id)}>


              <p className="center-this">Item: {currCart.id}</p>
              <p className="center-this">Price: {currCart.price}</p>
              <hr className="short-hr"/>

            </div>
          )
        }) : ''}
      </div>

    </div>
  )
}


export default Cart;