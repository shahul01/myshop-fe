import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useFetch from "../../Helpers/Hooks/useFetch";

const Products = () => {

  const router = useRouter();
  const [productsList, setProductsList] = useState([]);
  const {data: retrievedData, error, isPending} = useFetch('http://localhost:1337/products/');

  useEffect( () => {
    if (retrievedData) setProductsList(retrievedData);
  }, [retrievedData])

  return (
    <div className="App">
      <h1 className="center-this">My Shop</h1>
      <div className="item-container">

        {retrievedData && productsList.map((currProduct) => {
          return (
            <div
              key={currProduct.productId} className="item"
              onClick={() => router.push(`products/${currProduct.productId}`)}
              >

              <img src={currProduct.imgSrc} alt="" className="item-image"/>
              <p className="title">{currProduct.title}</p>
              <p className="price">{currProduct.price}</p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Products;