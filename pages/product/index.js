// import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useFetch from "../../Helpers/Hooks/useFetch";
import styles from "./allProducts.module.css";

export let sentPageId = 0;

const Product = () => {

  const router = useRouter();
  const [ productsList, setProductsList ] = useState([]);

  // COMMT: TODO: Add ability to search price, tags etc
  // COMMT: TODO: Add auto correct to search etc

  const  [ searchTitle, setSearchTitle ] = useState("");
  let fetchUrl = `http://localhost:1337/products/`;

  if (searchTitle.length >= 1) {
    fetchUrl = `http://localhost:1337/products?title_contains=${searchTitle}`;
  };

  const {data: retrievedData, error, isPending} = useFetch(fetchUrl, 'get', null);

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData])

  function handleGoToProductDetail(id, productId) {
    sentPageId = id;
    router.push(`/product/${productId}`)
  };

  return (
    <div className="App">

      {/* <Head>
        <title>MyShop</title>
      </Head> */}

      {/* // COMMT: Make this a component */}
      <div className={styles['title-area']}>
        <span className={styles['title-name']}>My Shop</span>
        <div className={styles['search-box-container']}>
          <input
            className={styles['search-box']}
            placeholder="Search"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target?.value)}
          />
        </div>

      </div>
      <div className="item-container">

        {retrievedData && productsList.map((currProduct) => {
          return (
            <div
              key={currProduct.productId} className="item"
              onClick={() => handleGoToProductDetail(currProduct.id, currProduct.productId)}
              >

              <img src={currProduct.imgSrc} alt={currProduct.title} className="item-image"/>
              <p className="title">{currProduct.title}</p>
              <p className="price">{currProduct.price}</p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Product;