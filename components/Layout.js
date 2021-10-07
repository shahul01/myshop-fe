import { useRouter } from "next/router";
import CartSidebar from "./CartSidebar/index";
import Navbar from "./Navbar/index";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <Navbar
        isSearchBar={
          (router?.route !== "/account/validation")
            ? true
            : false
        }
      />
      { children }
      <CartSidebar
        isCartSidebar={

          (router?.route !== "/account/validation"
            && router?.route !== "/cart")
              ? true
              : false
        }
      />
    </div>
  )
}

export default Layout;