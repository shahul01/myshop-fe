// import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { ADD_TO_CART } from "../../Helpers/Reducers/cartReducer";
import { CartContext } from "../../Helpers/Contexts/CartContext";
import useFetch from "../../Helpers/Hooks/useFetch";
import { pageId } from "./index";
import { addToCart } from "./api";

const Slug = () => {
  const [productsList, setProductsList] = useState([]);
  const pageUrl = `http://localhost:1337/products/${pageId}`;
  const {data: retrievedData, error, isPending} = useFetch(pageUrl);
  const currProduct = productsList;
  const { dispatch } = useContext(CartContext);

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
    // console.log('retrievedData :>> ', retrievedData);
  }, [retrievedData]);

  function handleAddToCart(product) {
    // console.log('product :>> ', product);
    //is there any way to auto refresh cart w/o dispatch once data submitted

    new Promise((res, req) => {

      res( addToCart(product) );

    }).then((res) => {
      dispatch({

        type: ADD_TO_CART,
        cart: {
          id: res.id,
          productId: product.productId,
          title: product.title,
          imgSrc: product.imgSrc,
          price: product.price,
        }
      })

    });


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

          <img src={currProduct?.imgSrc} alt={currProduct?.title} className="item-image"/>
          <h1>Title: {currProduct?.title}</h1>
          <h3>Price: {currProduct?.price}</h3>

          <button
            className='add-to-cart'
            onClick={() => handleAddToCart(currProduct)}
          >
            Add to Cart
          </button>

        </div>

      )}

    </div>

  )
}

export default Slug;