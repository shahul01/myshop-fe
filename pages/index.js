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
