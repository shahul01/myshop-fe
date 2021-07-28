import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

const Detail = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  // let myData =
  const [productsList, setProductsList] = useState([]);
  let retreivedData = [];

  useEffect( async () => {
    retreivedData = await axios.get('http://localhost:8000/products/')
    setProductsList(retreivedData.data)
    console.log('retreivedData :>> ', retreivedData);
  }, [])



  return (
    <div>
      {/* <p className="back-btn" onClick={() => router.push('/products')}>Go Back</p> */}
      <Link href="/products">
        <a className="back-btn">
          Go Back
        </a>
      </Link>
        <div>
          <h1>Title: {productsList[pageId-1]?.title}</h1>
          <img src={productsList[pageId-1]?.imgSrc} alt="" className="item-image"/>
          <h3>Price: {productsList[pageId-1]?.price}</h3>
        </div>
    </div>
  )
}

export default Detail;