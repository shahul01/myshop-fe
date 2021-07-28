import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cart from "../../components/Cart";

const products = () => {

  const router = useRouter();
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

  // useEffect(() => {
  //   setUpdatedPrice(totalPrice)
  //   console.log('updatedPrice :>> ', updatedPrice);
  // },[totalPrice])

  function handleAddToCart(id, price) {
    setCart([...cart, {
      key:(Math.random()*10000).toFixed(0),
      'id': id,
      'price': price
    }])
    // console.log("cart", JSON.stringify(cart, null, 2))
    console.log("updatedPrice", JSON.stringify(updatedPrice, null, 2))
  };

  function handleDelFromCart(id) {
    setCart(cart => cart.filter(item => item.id !== id));
    console.log('handleDelFromCart :>> ', cart);
  }

  return (
    <div className="App">
      <h1 className="center-this">My Shop</h1>
      <div className="item-container">

        {data.map((currData) => {
          return (
            // onClick={() => handleAddToCart(currData.id, currData.price)}
            <div
                key={currData.id} className="item"
                onClick={() => router.push(`products/${currData.id}`)}
                >

              <img src={currData.imgSrc} alt="" className="item-image"/>
              <p className="title">{currData.title}</p>
              <p className="price">{currData.price}</p>

            </div>
          );
        })}

      </div>

      <Cart
        cart={cart}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        updatedPrice={updatedPrice}
        setUpdatedPrice={setUpdatedPrice}
        onClick={handleDelFromCart}
      />

    </div>
  );
}

export default products;