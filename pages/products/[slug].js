// import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../../components/useFetch";
import CartOld from "../../components/CartOld";

const Slug = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  const [productsList, setProductsList] = useState([]);
  const {data: retrievedData, error, isPending} = useFetch('http://localhost:1337/products/');

  let [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [updatedPrice, setUpdatedPrice] = useState(0);
  let [mounted, setMounted] = useState(false);

  useEffect( () => {
    setMounted(true);
  }, []);

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData]);

  function handleAddToCartOld(productId, price) {
    // key:(Math.random()*10000).toFixed(0),
    if (!mounted) return;

    setCart([...cart, {
      'productId': productId,
      'price': price
    }])
    // console.log("cart", JSON.stringify(cart, null, 2))
    console.log("updatedPrice", JSON.stringify(updatedPrice, null, 2))
  };


  function handleDelFromCart(id) {
    if (!mounted) return;
    setCart(cart => cart.filter(item => item.productId !== id));
    console.log('handleDelFromCart :>> ', cart);
  };


  return (
    <div>
      {/* <p className="back-btn" onClick={() => router.push('/products')}>Go Back</p> */}
      <Link href="/products">
        <a className="back-btn">
          Go Back
        </a>
      </Link>
      {retrievedData && (
        <div>
          <img src={productsList[pageId-1]?.imgSrc} alt="" className="item-image"/>
          <h1>Title: {productsList[pageId-1]?.title}</h1>
          <h3>Price: {productsList[pageId-1]?.price}</h3>
          {/* <button
                onClick={() => handleAddToCartOld(
                  productsList[pageId-1]?.productId,
                  productsList[pageId-1]?.price
                )}
                >
              Add to Cart (Old)
          </button> */}
        </div>

      )}

      {/* {mounted && (
        <CartOld
          cart={cart}
          setCart={setCart}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          updatedPrice={updatedPrice}
          setUpdatedPrice={setUpdatedPrice}
          onClick={handleDelFromCart}
        />
      )} */}


    </div>

  )
}

export default Slug;