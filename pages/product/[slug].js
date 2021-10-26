import Link from "next/link";
import { useState, useEffect, useContext } from "react";
// import ImageGallery from "components/ImageGallery/ImageGallery";
import ImageGallery from "react-image-gallery";
import { ADD_TO_CART } from "../../helpers/Reducers/cartReducer";
import { CartContext } from "../../helpers/Contexts/CartContext";
import useFetch from "../../helpers/Hooks/useFetch";
import { sentPageId } from "./index";
import { addToCart } from "./api/api";
import "react-image-gallery/styles/css/image-gallery.css";
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
  const [imageData, setImageData] = useState([]);
  const { dispatch } = useContext(CartContext);

  // console.log(`product: `, product);

  useEffect( () => {
    if (retrievedData) setProduct(retrievedData);

  }, [retrievedData]);

  useEffect(() => {
    // console.log(`product: `, product);
    console.log('uE runs');
    updateImageData();

  }, [product]);

  useEffect(() => {
    console.log('imageData', imageData);

  }, [imageData]);

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

  function updateImageData() {

    if (imageData?.length === product?.images?.length) return;

    product?.images?.forEach( currImage => {
      // console.log(`currImage: `, currImage);

      setImageData(imageData => [
        ...imageData,
        {
          "original": 'http://localhost:1337' + currImage.url,
          // "thumbnail" : 'http://localhost:1337' + currImage.formats.thumbnail.url
        }
      ]);


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
              {/* <img src={product.imgSrc} alt={product.title} className="item-image"/> */}

              <ImageGallery
                items={imageData}
              />

            </div>

            <div className={styles['main-details']}>
              <h1>{product.title}</h1>
              <p>{product.ratings} Stars</p>
              <h3>$ {product.price}</h3>
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