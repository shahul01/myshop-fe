import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { ADD_TO_CART } from "../../helpers/Reducers/cartReducer";
import { CartContext } from "../../helpers/Contexts/CartContext";
import useFetch from "../../helpers/Hooks/useFetch";
import { sentPageId } from "./index";
import { addToCart } from "./api/api";
import styles from "./styles/slug.module.css";

const Slug = () => {

  let pageId = 0;
  let newHistoryProduct = {};
  let histArrUnparsed;
  let histArr = [];
  let hist = {};

  // LclStrg SET - historyProduct
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
  const {data: retrievedData, error, isPending} = useFetch(pageUrl, 'GET', null);

  const [product, setProduct] = useState([]);
  // const currProduct = product;
  const { dispatch } = useContext(CartContext);

  console.log(`product: `, product);

  useEffect( () => {
    if (retrievedData) setProduct(retrievedData);

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


  };


  return (
    <div className={styles['product-details-page']}>
      <Link href="/product">
        <a className="back-btn">
          Go back
        </a>
      </Link>

      {(retrievedData && product?.id >= 1) ? (

        <div className={styles['details-container']}>

          <div className={styles['img-details-container']}>

            <div className={styles['img-sets-container']}>
              <img src={product.imgSrc} alt={product.title} className="item-image"/>
            </div>

            <div className={styles['main-details']}>
              <h1>Title: {product.title}</h1>
              <p>{product.ratings} Stars</p>
              <h3>Price: {product.price}</h3>
              <p>Seller: {product.seller}</p>

              <button
                  className='add-to-cart'
                  onClick={() => handleAddToCart(product)}
                >
                Add to Cart
              </button>

            </div>

          </div>


          <p className={styles['description']}>
              {product.description}
          </p>
        </div>

      ) : (
        <div>
          Loading...
        </div>
      )}

    </div>

  )
}

export default Slug;