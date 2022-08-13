// `PRODUCT DETAILS` Page

// import axios from "axios";
// import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import ImageGallery from "react-image-gallery";
import { ADD_TO_CART, INCREMENT_PRODUCT } from "../../helpers/Reducers/cartReducer";
import { CartContext } from "../../helpers/Contexts/CartContext";
import useFetch from "../../helpers/Hooks/useFetch";
import { sentPageId } from "./index";
import { addToCart, incrCartNumber } from "./_api";
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
    histArr?.push(newHistoryProduct);
    localStorage.setItem('historyProduct', JSON.stringify(histArr) );
  }, []);


  if (sentPageId >= 1) {
    pageId = sentPageId;
  } else if (sentPageId === 0 && typeof window !== 'undefined') {
    // Localstorage GET
    histArrUnparsed = localStorage.getItem('historyProduct');
    histArr = JSON.parse(histArrUnparsed);
    hist = histArr?.[histArr?.length - 1];
    pageId = hist?.clickedDetails;
  };

  // COMMT: fetch(get) data
  const pageUrl = `http://localhost:1337/products/${pageId}`;
  const { data: retrievedData, error, isPending } = useFetch(pageUrl, 'GET', null);

  const { cart, dispatch }:{dispatch:ICart} = useContext(CartContext);
  // const [productsList, setProductsList] = useState<IProductAction[]>([]);
  const [ productsList, setProductsList ] = useState<IModelProduct|IProductAction|object>({});
  // const [ prodCartPrevQty, setProdCartPrevQty] = useState(0);
  const [ prodCartPrevQty, setProdCartPrevQty] = useState(0);
  const [ localCounter, setLocalCounter ] = useState(0);
  const [ imageData, setImageData ] = useState([]);

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
    // console.log('productsList :>> ', productsList);
  }, [retrievedData]);

  useEffect(() => {
    updateImageData();
  }, [productsList]);

  useEffect(() => {
    // console.log('rptItem :>> ', cart?.[0]?.repeatItem);
  }, [cart]);

  // useEffect(() => {
  //   console.log('imageData', imageData);
  // }, [imageData]);

  function getProdCartPrevQty():void|number {
    const currProdInCart = cart?.filter((currCartCtx:ICart) => currCartCtx?.productId === productsList?.productId )?.[0];
    console.log('cart', cart);
    console.log('currProdInCart :>> ', currProdInCart);
    if (currProdInCart?.length && currProdInCart?.repeatItem) {
      // COMMT: If product already present
      return setProdCartPrevQty(prev => currProdInCart?.repeatItem+1);
    } else {
      // COMMT: If there is no such product
      return 0;
    };
  };

  async function handleAddToCart(productsList:IModelProduct) {
    // COMMT: is there any way to auto refresh cart w/o dispatch once data submitted ?
    console.log('prodCartPrevQty', prodCartPrevQty)
    getProdCartPrevQty();
    let response = {};
    if (prodCartPrevQty === 0) {
      response = await addToCart({
        ...productsList, repeatItem: localCounter+1
      });
      dispatch({
        type: ADD_TO_CART,
        cart: {
          id: response?.id,
          productId: productsList?.productId,
          title: productsList?.title,
          repeatItem: localCounter+1,
          imgSrc: productsList?.images?.[0],
          price: productsList?.price,
        }
      });
    } else if (prodCartPrevQty >= 1) {
      response = await incrCartNumber({
        productId: productsList?.productId,
        repeatItem: localCounter+1,
      });
      dispatch({
        type: INCREMENT_PRODUCT,
        cart: {
          id: response?.id,
          productId: productsList?.productId,
          repeatItem: localCounter+1,
        }
      });
    };

    setLocalCounter(prev => prev+1);

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
                  ([...Array( 5-Math.round((productsList?.ratings)||0) )?.fill('☆')].map((el, i) => {
                    return <span key={i} className={styles['empty-star']}>{el}</span>
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
                        ([...Array( 5-(currReview?.rating||0) )?.fill('☆')].map((el, i) => {
                          return <span key={i} className={styles['empty-star']}>{el}</span>
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

  );
};

export default Slug;