// import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../../components/useFetch";
import Cart from "../../components/Cart";

const Detail = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  const [productsList, setProductsList] = useState([]);
  const {data: retreivedData, error, isPending} = useFetch('http://localhost:1337/products/');

  let [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [updatedPrice, setUpdatedPrice] = useState(0);

  useEffect( async () => {
    if (retreivedData) setProductsList(retreivedData);
  }, [retreivedData])

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
    <div>
      {/* <p className="back-btn" onClick={() => router.push('/products')}>Go Back</p> */}
      <Link href="/products">
        <a className="back-btn">
          Go Back
        </a>
      </Link>
      {retreivedData && (
          <div>
            {/* why '-2' in pageId-2 */}
            <img src={productsList[pageId-2]?.imgSrc} alt="" className="item-image"/>
            <h1>Title: {productsList[pageId-2]?.title}</h1>
            <h3>Price: {productsList[pageId-2]?.price}</h3>
            <button
                onClick={() => handleAddToCart(
                  productsList[pageId-2]?.id,
                  productsList[pageId-2]?.price
                )}
              >
                Add to Cart
            </button>
          </div>
        )

      }

      <Cart
        cart={cart}
        setCart={setCart}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        updatedPrice={updatedPrice}
        setUpdatedPrice={setUpdatedPrice}
        onClick={handleDelFromCart}
      />


    </div>

  )
}

export default Detail;