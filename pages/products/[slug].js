// import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../../components/useFetch";

const Detail = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  const [productsList, setProductsList] = useState([]);
  const {data: retreivedData, error, isPending} = useFetch('http://localhost:8000/products/');

  useEffect( async () => {
    if (retreivedData) setProductsList(retreivedData);
  }, [retreivedData])



  return (
    <div>
      {/* <p className="back-btn" onClick={() => router.push('/products')}>Go Back</p> */}
      <Link href="/products">
        <a className="back-btn">
          Go Back
        </a>
      </Link>
      {productsList && (
          <div>
            <img src={productsList[pageId-1]?.imgSrc} alt="" className="item-image"/>
            <h1>Title: {productsList[pageId-1]?.title}</h1>
            <h3>Price: {productsList[pageId-1]?.price}</h3>
          </div>
        )

      }
    </div>
  )
}

export default Detail;