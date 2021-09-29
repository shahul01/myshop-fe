import Head from "next/head";
// import { useRouter } from "next/router";
import Link from "next/link";

export default function App() {
  // const router = useRouter();

  return (
    <div>
      <Head>
        <title>MyShop</title>
      </Head>

      <div className="home-btn-container">
      <Link href="/products">
        <a className="products-link-btn">
          Products
        </a>
      </Link>

      </div>
    </div>
  )
}
