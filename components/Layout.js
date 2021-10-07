import { useRouter } from "next/router";
import CartSidebar from "./CartSidebar/index";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      { children }
      <CartSidebar
        isCartSidebar={

          (router?.route !== "/cart"
            && router?.route !== "/account/validation")
              ? true
              : false
        }
      />
    </div>
  )
}

export default Layout;