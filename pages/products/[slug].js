// import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../../components/useFetch";

const Slug = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  const [productsList, setProductsList] = useState([]);
  const {data: retrievedData, error, isPending} = useFetch('http://localhost:1337/products/');

  let [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [updatedPrice, setUpdatedPrice] = useState(0);
  let [mounted, setMounted] = useState(false);

  useEffect( () => {
    setMounted(true);
  }, []);

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData]);

  function handleDelFromCart(id) {
    if (!mounted) return;
    setCart(cart => cart.filter(item => item.productId !== id));
    console.log('handleDelFromCart :>> ', cart);
  };


  return (
    <div>
      {/* <p className="back-btn" onClick={() => router.push('/products')}>Go Back</p> */}
      <Link href="/products">
        <a className="back-btn">
          Go Back
        </a>
      </Link>
      {retrievedData && (
        <div>
          <img src={productsList[pageId-1]?.imgSrc} alt="" className="item-image"/>
          <h1>Title: {productsList[pageId-1]?.title}</h1>
          <h3>Price: {productsList[pageId-1]?.price}</h3>
        </div>

      )}


    </div>

  )
}

export default Slug;