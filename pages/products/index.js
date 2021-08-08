import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useFetch from "../../components/useFetch";
import Cart from "../../components/CartOld";

const Products = () => {

  const router = useRouter();
  // let [data, setData] = useState([]);

  // let [cart, setCart] = useState([]);
  // let [totalPrice, setTotalPrice] = useState(0);
  // let [updatedPrice, setUpdatedPrice] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const {data: retrievedData, error, isPending} = useFetch('http://localhost:1337/products/');

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData])

  // useEffect(() => {
  //   setUpdatedPrice(totalPrice)
  //   // console.log('updatedPrice :>> ', updatedPrice);
  // },[totalPrice])

  // function handleAddToCart(id, price) {
  //   setCart([...cart, {
  //     key:(Math.random()*10000).toFixed(0),
  //     'id': id,
  //     'price': price
  //   }])
  //   // console.log("cart", JSON.stringify(cart, null, 2))
  //   console.log("updatedPrice", JSON.stringify(updatedPrice, null, 2))
  // };

  // function handleDelFromCart(id) {
  //   setCart(cart => cart.filter(item => item.id !== id));
  //   console.log('handleDelFromCart :>> ', cart);
  // }

  return (
    <div className="App">
      <h1 className="center-this">My Shop</h1>
      <div className="item-container">

        {retrievedData && productsList.map((currProduct) => {
          return (
            // onClick={() => handleAddToCart(currProduct.id, currProduct.price)}
            <div
                key={currProduct.productId} className="item"
                onClick={() => router.push(`products/${currProduct.productId}`)}
                >

              <img src={currProduct.imgSrc} alt="" className="item-image"/>
              <p className="title">{currProduct.title}</p>
              <p className="price">{currProduct.price}</p>

            </div>
          );
        })}

      </div>

      {/* <Cart
        cart={cart}
        setCart={setCart}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        updatedPrice={updatedPrice}
        setUpdatedPrice={setUpdatedPrice}
        onClick={handleDelFromCart}
      /> */}

    </div>
  );
}

export default Products;