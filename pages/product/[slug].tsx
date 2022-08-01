// `PRODUCT DETAILS` Page

// import axios from "axios";
// import { useRouter } from "next/router";
import Head from "next/head";
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

  // COMMT: refactor localstorage codes
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
    // console.log('productsList :>> ', productsList);
  }, [retrievedData]);

  useEffect(() => {
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
          productId: productsList?.productId,
          title: productsList?.title,
          imgSrc: productsList?.images[0],
          price: productsList?.price,
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
          "original": currImage,
          "thumbnail" : currImage
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

          <Head>
            <title>{productsList?.title} - MyShop</title>
          </Head>

          <div className={styles['img-details-container']}>

            <div className={styles['img-sets-container']}>
              {/* <img src={productsList?.imgSrc} alt={productsList?.title} className="item-image"/> */}

              <ImageGallery
                showNav={false}
                thumbnailPosition='left'
                showPlayButton={false}
                items={imageData}
              />

            </div>

            <div className={styles['main-details']}>
              <h1>{productsList?.title}</h1>
              <p className={styles['ratings']} title={productsList?.ratings} >
                {/* <span>Ratings: </span> */}
                {
                  ([...Array(Math.round((productsList?.ratings)||0))?.fill('goldstar')].map((el, i) => {
                    return <span key={i}>
                      {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/FA_star.svg" alt="Stars" /> */}
                      <img src={'../../assets/images/svg/IconRatingStar.svg'} alt="Stars" />
                    </span>
                  }))
                }
                {
                  ([...Array( 5-Math.round((productsList?.ratings)||0) )?.fill('☆')].map((el) => {
                    return <span className={styles['empty-star']}>{el}</span>
                  }))
                }
                {
                  <span className={styles['rating-votes']}>
                    ( {new Intl.NumberFormat().format(productsList?.ratingVotes)} votes )
                  </span>
                }

              </p>
              <h3>$ {productsList?.price}</h3>

              <button
                  className='add-to-cart'
                  onClick={() => handleAddToCart(productsList)}
                >
                Add to Cart
              </button>

            </div>

          </div>

          <div className={styles['description-container']}>
            <h2>Description</h2>
            <p className={styles['description']}>
              {productsList?.description}
            </p>
          </div>

          <div className={styles['reviews-title-data-container']}>
            <h4>User Reviews</h4>

            <div className={styles['reviews-container']}>
              {productsList?.reviews?.map(currReview => (

                <div
                  className={styles['review']}
                  key={currReview?.reviewId}
                  >
                  <h5 className={styles['review-title']}>
                    {currReview?.title}
                  </h5>
                  <div className={styles['review-body']}>
                    <span className={styles['review-name']}>
                      By {currReview?.username}
                    </span>
                    <span className={styles['review-rating']} title={currReview?.rating}>
                      {
                        ([...Array((currReview?.rating||0))?.fill('goldstar')].map((el, i) => {
                          return <span key={i}>
                            <img src={'../../assets/images/svg/IconRatingStar.svg'} alt="Stars" />
                          </span>
                        }))
                      }
                      {
                        ([...Array( 5-(currReview?.rating||0) )?.fill('☆')].map((el) => {
                          return <span className={styles['empty-star']}>{el}</span>
                        }))
                      }
                    </span>
                    <div className={styles['review-review']}>
                      {currReview?.review}
                    </div>
                  </div>

                </div>

                ))}

                </div>
            </div>

        </div>

      ) : (
        <div>
          <Head>
            <title>Product - MyShop</title>
          </Head>
          <div>Loading...</div>
        </div>
      )}

    </div>

  )
}

export default Slug;