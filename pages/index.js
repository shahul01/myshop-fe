import { useRouter } from "next/router";
import Link from "next/link";

export default function App() {
  const Route = useRouter();

  return (
    <div>
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
