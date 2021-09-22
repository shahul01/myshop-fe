// import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../../components/useFetch";
import { addToCart } from "./api";

const Slug = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  const [productsList, setProductsList] = useState([]);
  const {data: retrievedData, error, isPending} = useFetch('http://localhost:1337/products/');
  const currProduct = productsList[pageId-1];

  let [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [updatedPrice, setUpdatedPrice] = useState(0);


  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData]);

  function handleAddToCart(product) {
    // console.log('product :>> ', product);
    addToCart(product);
    // refreshCart();
  }

  // function handleDelFromCart(id) {
  //   setCart(cart => cart.filter(item => item.productId !== id));
  //   console.log('handleDelFromCart :>> ', cart);
  // };


  return (
    <div className='product-details-page'>
      <Link href="/products">
        <a className="back-btn">
          Go Back
        </a>
      </Link>

      {retrievedData && (
        <div>

          <img src={currProduct?.imgSrc} alt="" className="item-image"/>
          <h1>Title: {currProduct?.title}</h1>
          <h3>Price: {currProduct?.price}</h3>

          <button
            className='add-to-cart'
            onClick={() =>handleAddToCart(currProduct)}
          >
            Add to Cart
          </button>

        </div>

      )}

    </div>

  )
}

export default Slug;