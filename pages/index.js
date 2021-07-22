import { useState, useEffect } from "react";
// import uuid from "uuid/v1";
// import "./styles.css";

export default function App() {
  let [data, setData] = useState([
    {
      id: 1,
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/815g8Uo656S._AC_UL200_SR200,200_.jpg",
      title: "iTV Apple",
      price: 200.00
    },
    {
      id: 2,
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/713mzPe9SwS._AC_UL200_SR200,200_.jpg",
      title: "Atomic Habits Book",
      price: 10.00
    },
    {
      id: 3,
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/710o0VupScL._AC_UL320_SR320,320_.jpg",
      title: "TShirt",
      price: 20.00
    }
  ]);

  let [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [updatedPrice, setUpdatedPrice] = useState(0);
  // let totalPrice = 0;

  // useEffect(() => {
  //   // totalPrice
  //   handleUpdateTotalPrice()
  // }, [])

  function handleCart(id, price) {
    setCart([...cart, {
      key:(Math.random()*10000).toFixed(0),
      'id': id,
      'price': price
    }])
    // console.log("clicked: ", id)
    // console.log("cart", cart)
    // console.log("data", data)
  };

  return (
    <div className="App">
      <h1 className="center-this">My Shop</h1>
      <div className="item-container">

        {data.map((currData) => {
          return (
            <div key={currData.id} className="item" onClick={() => handleCart(currData.id, currData.price)}>

              <img src={currData.imgSrc} alt="" />
              <p className="title">{currData.title}</p>

            </div>
          );
        })}

      </div>
      <div>
        {/* // TODO:
          When already added item clicked, add it again(?)
          Loop data from data's id than send data to cart
          On click on a cart, run for loop, update totalPrice.
          delete cart
        */}
        <hr />
        <h2 className="center-this">Cart</h2>

        {/* <h4>Total Price: {updatedPrice}</h4> */}
        <div className="cart-container">
          {cart.map((currCart) => {
            // const handleUpdateTotalPrice = () =>
            totalPrice = totalPrice + currCart.price
            // setTotalPrice = totalPrice
            updatedPrice = totalPrice
            // setUpdatedPrice = updatedPrice
            console.log("updatedPrice", updatedPrice)


            return (
              <div key={currCart.key} className="cart">


                <p className="center-this">Item: {currCart.id}</p>
                <p className="center-this">Price: {currCart.price}</p>
                <hr className="short-hr"/>

              </div>
            )
          })}
          <h4 className="center-this">Total Price: {updatedPrice}</h4>
        </div>
      </div>


    </div>
  );
}
