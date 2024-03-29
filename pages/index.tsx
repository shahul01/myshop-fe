import Head from "next/head";
// import { useRouter } from "next/router";
// import Link from "next/link";
import Home from "./product/index";

export default function App() {
  // const router = useRouter();

  return (
    <div>
      <Head>
        <title>MyShop</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>

      {/* <div className="home-btn-container">
        <Link href="/product">
          <a className="product-link-btn">
            Product
          </a>
        </Link>
      </div> */}

     <Home />
    </div>
  )
}
