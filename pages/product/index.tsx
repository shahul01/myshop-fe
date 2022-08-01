// `PRODUCTS` page

// import Head from "next/head";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import useFetch from "../../helpers/Hooks/useFetch";
import styles from "./styles/allProducts.module.css";
import { SearchContext } from "helpers/Contexts/SearchContext";
// import logoS from "../../images/svg/logoS.svg";

export let sentPageId = 0;

const Product = () => {

  const router = useRouter();
  const [ productsList, setProductsList ] = useState<IModelProduct[]>([]);
  const { searchText } = useContext(SearchContext);

  // COMMT: TODO: Add ability to search price, tags etc
  // COMMT: TODO: Add auto correct to search etc

  const  [ searchTitle, setSearchTitle ] = useState("");

  useEffect(() => {
    console.log('searchTitle?.length :>> ', searchTitle?.length);

    if (searchTitle?.length === 0) {
      setFetchUrl(`http://localhost:1337/products`);
      console.log('XDXDXD');
    } else if (searchTitle?.length >= 1) {
      setFetchUrl(`http://localhost:1337/products?title_contains=${searchTitle}`);
      console.log('😀😀😀');
    };

  }, [searchTitle]);

  const [ fetchUrl, setFetchUrl ] = useState(`http://localhost:1337/products/?_sort=id`);


  const {data: retrievedData, error, isPending} = useFetch(fetchUrl, 'GET', null);

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData]);

  useEffect(() => {
    console.log('searchCtx prod 1 ', searchText);
  }, [searchText]);

  useEffect(() => {
    // if (searchText?.searchText !== '')
    setSearchTitle(searchText?.searchText);
    // console.log('searchTitle (prod) ', searchTitle);
    fetchUrl = `http://localhost:1337/products?title_contains=${searchText?.searchText}`;
    // console.log('fetchUrl (prod) ', fetchUrl);
  }, [searchText?.searchText]);

  useEffect(() => {
    console.log('fetchUrl', fetchUrl);;
  }, [fetchUrl]);


  function handleGoToProductDetail(id:number, productId:number) {
    sentPageId = id;
    // find a diff way to redirect
    // router.push(`/product/${productId}`)
    router.push(`/product/${id}`)
  };

  return (
    <div
      // style={{background: `url(/assets/images/png/logoS.png)`}}
      className={styles['app']}
      >

      <Head>
        <title>All products - MyShop</title>
      </Head>

      {/* // COMMT: Make this a component */}
      <div className={styles['item-container']}>

        {retrievedData && productsList?.map((currProduct:IModelProduct) => {
          return (
            <div
              key={currProduct.productId} className={styles['item']}
              onClick={() => handleGoToProductDetail(currProduct.id, currProduct.productId)}
              title={currProduct.title}
              >

              <img src={currProduct.images[0]} alt={currProduct.title} className={styles['item-image']}/>
              <p className={styles['title']}>{currProduct.title}</p>
              <div className={styles['product-overview']}>
                <p className={styles['price']}>$ {currProduct.price}</p>
                <p className={styles['ratings']}>{currProduct.ratings}
                  <span>☆</span>
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Product;
