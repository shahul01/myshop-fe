// `PRODUCT DETAILS` Page

// import axios from "axios";
// import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import ImageGallery from "react-image-gallery";
import { ADD_TO_CART } from "../../helpers/Reducers/cartReducer";
import { CartContext } from "../../helpers/Contexts/CartContext";
import useFetch from "../../helpers/Hooks/useFetch";
import { sentPageId } from "./index";
import { addToCart } from "./_api";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./styles/slug.module.css";

const Slug = () => {

  type TJSONString = string|null;

  let pageId = 0;
  let newHistoryProduct: IHistProduct = {};
  let histArrUnparsed: TJSONString;
  let histArr: IHistProduct[]|TJSONString = [];
  let hist: IHistProduct = {};

  // Localstorage SET
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
    // Localstorage GET
    histArrUnparsed = localStorage.getItem('historyProduct');
    histArr = JSON.parse(histArrUnparsed);
    hist = histArr[histArr.length - 1];
    pageId = hist?.clickedDetails;
  };

  // COMMT: fetch data
  const pageUrl = `http://localhost:1337/products/${pageId}`;
  const {data: retrievedData, error, isPending} = useFetch(pageUrl, 'GET', null);

  // const [productsList, setProductsList] = useState<IProductAction[]>([]);
  const [productsList, setProductsList] = useState<IModelProduct|IProductAction|object>({});
  // const currProduct = productsList;
  const [imageData, setImageData] = useState([]);
  const { dispatch }:{dispatch:ICart} = useContext(CartContext);


  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
    console.log('productsList :>> ', productsList);
  }, [retrievedData]);

  useEffect(() => {
    // console.log(`productsList: `, productsList);
    // console.log('uE runs');
    updateImageData();

  }, [productsList]);

  // useEffect(() => {
  //   console.log('imageData', imageData);

  // }, [imageData]);

  function handleAddToCart(productsList) {
    // COMMT: is there any way to auto refresh cart w/o dispatch once data submitted ?
    new Promise((res, req) => {

      res( addToCart(productsList) );

    }).then((res) => {
      dispatch({

        type: ADD_TO_CART,
        cart: {
          id: res.id,
          productId: productsList.productId,
          title: productsList.title,
          imgSrc: productsList.imgSrc,
          price: productsList.price,
        }
      })

    });


  };

  function updateImageData() {

    if (imageData?.length === productsList?.images?.length) return;

    productsList?.images?.forEach( currImage => {
      // console.log(`currImage: `, currImage);

      setImageData(imageData => [
        ...imageData,
        {
          "original": 'http://localhost:1337' + currImage.url,
          "thumbnail" : 'http://localhost:1337' + currImage.formats.thumbnail.url
        }
      ]);


    });
    // console.log(`imageData: `, imageData);

  };


  return (

    <div className={styles['product-details-page']}>
      <Link href="/product">
        <a className="back-btn">
          Go back
        </a>
      </Link>

      {(retrievedData && productsList?.id >= 1) ? (

        <div className={styles['details-container']}>

          <div className={styles['img-details-container']}>

            <div className={styles['img-sets-container']}>
              {/* <img src={productsList.imgSrc} alt={productsList.title} className="item-image"/> */}

              <ImageGallery
                showNav={false}
                thumbnailPosition='left'
                showPlayButton={false}
                items={imageData}
              />

            </div>

            <div className={styles['main-details']}>
              <h1>{productsList.title}</h1>
              <p>{productsList.ratings} Stars</p>
              <h3>$ {productsList.price}</h3>

              <button
                  className='add-to-cart'
                  onClick={() => handleAddToCart(productsList)}
                >
                Add to Cart
              </button>

              <p>Seller: {productsList.seller}</p>

            </div>

          </div>

          <div>
            <h2>Description</h2>
            <p className={styles['description']}>
                {productsList.description}
            </p>
          </div>

          <div className={styles['reviews-container']}>
            <h4>User Reviews</h4>

            {productsList?.reviews?.map(currReview => (

              <div
                className={styles['review']}
                key={currReview.id}
                >
                <h5 className={styles['review-title']}>
                  {currReview.title}
                </h5>
                <div className={styles['review-body']}>
                  <span className={styles['review-name']}>
                    {currReview.name}
                  </span>
                  <span className={styles['review-rating']}>
                    {currReview.rating} Stars
                  </span>
                  <div className={styles['review-review']}>
                    {currReview.review}
                  </div>
                </div>

              </div>

            ))}

          </div>

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