import { useState, useEffect } from "react";

const Cart = ({ cart, totalPrice, setTotalPrice, updatedPrice, setUpdatedPrice, onClick }) => {

  // useEffect(() => {
  //   setUpdatedPrice(totalPrice)
  //   console.log('updatedPrice :>> ', updatedPrice);
  // },[totalPrice])

  return (
    <div>
      <hr />
      <h3 className="center-this">Total Price: {updatedPrice}</h3>

      <hr />
      <h4 className="center-this">Cart</h4>
      <div className="cart-container">
        {cart.length > 0 ? cart.map((currCart) => {
          totalPrice = totalPrice + currCart.price
          // updatedPrice = totalPrice
          setUpdatedPrice(totalPrice)
          // setUpdatedPrice(updatedPrice)

          // totalPrice = totalPrice + currCart.price
          // setTotalPrice(totalPrice);
          // setUpdatedPrice(totalPrice)


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