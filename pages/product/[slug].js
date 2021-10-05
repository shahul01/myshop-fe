// import axios from "axios";
// import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { ADD_TO_CART } from "../../Helpers/Reducers/cartReducer";
import { CartContext } from "../../Helpers/Contexts/CartContext";
import useFetch from "../../Helpers/Hooks/useFetch";
import { sentPageId } from "./index";
import { addToCart } from "./_api";

const Slug = () => {

  let pageId = 0;
  let newHistoryProduct = {};
  let histArrUnparsed;
  let histArr = [];
  let hist = {};

  // LclStrg SET
  useEffect(() => {
    if (sentPageId === 0 || typeof window === 'undefined') return;
    newHistoryProduct = { 'clickedDetails': sentPageId };
    histArrUnparsed = localStorage.getItem('historyProduct');
    if (histArrUnparsed) histArr = JSON.parse(histArrUnparsed);
    histArr.push(newHistoryProduct);
    localStorage.setItem('historyProduct', JSON.stringify(histArr) );
  }, []);


  if (sentPageId >= 1) {
    pageId = sentPageId;
  } else if (sentPageId === 0 && typeof window !== 'undefined') {
    // LclStrg GET
    histArrUnparsed = localStorage.getItem('historyProduct');
    histArr = JSON.parse(histArrUnparsed);
    hist = histArr[histArr.length - 1];
    pageId = hist?.clickedDetails;
  };

  // COMMT: fetch data
  const pageUrl = `http://localhost:1337/products/${pageId}`;
  const {data: retrievedData, error, isPending} = useFetch(pageUrl, get, null);

  const [productsList, setProductsList] = useState([]);
  const currProduct = productsList;
  const { dispatch } = useContext(CartContext);


  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData]);

  function handleAddToCart(product) {
    // COMMT: is there any way to auto refresh cart w/o dispatch once data submitted ?
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
      <Link href="/product">
        <a className="back-btn">
          Go back
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