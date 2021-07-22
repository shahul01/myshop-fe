import { useState } from "react";

const Cart = ({ cart, totalPrice, updatedPrice, onClick }) => {

  // let [cart, setCart] = useState([]);
  // let [totalPrice, setTotalPrice] = useState(0);
  // let [updatedPrice, setUpdatedPrice] = useState(0);

  // function handleDelFromCart(id) {
  //   setCart(cart => cart.filter(item => item.id !== id));
  //   console.log('handleDelFromCart :>> ', cart);
  // }

  return (
    <div>

      <hr />
      <h2 className="center-this">Cart</h2>
      <div className="cart-container">
        {cart.length > 0 ? cart.map((currCart) => {
          totalPrice = totalPrice + currCart.price
          updatedPrice = totalPrice


          return (
            <div key={currCart.key} className="cart" onClick={() => onClick(currCart.id)}>


              <p className="center-this">Item: {currCart.id}</p>
              <p className="center-this">Price: {currCart.price}</p>
              <hr className="short-hr"/>

            </div>
          )
        }) : ''}
        <h4 className="center-this">Total Price: {updatedPrice}</h4>
      </div>

    </div>
  )
}


export default Cart;