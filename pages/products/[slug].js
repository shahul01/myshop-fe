// import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ADD_TO_CART } from "../../components/reducers/cartReducer";
import cartContext from "../../components/contexts/CartContext";
import useFetch from "../../components/useFetch";
import { addToCart } from "./api";

const Slug = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  const [productsList, setProductsList] = useState([]);
  const {data: retrievedData, error, isPending} = useFetch('http://localhost:1337/products/');
  const currProduct = productsList[pageId-1];
  // const { dispatch } = useContext(cartContext);


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

    //is there any way to auto refresh once called
    // dispatch({
    //   type: ADD_TO_CART,
    //   cart: { product }
    // })

  }


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