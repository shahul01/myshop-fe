import { useRouter } from "next/router";
import CartSidebar from "./CartSidebar/index";

const Layout = ({ children }) => {
  const router = useRouter();
  console.log('router :>> ', router);

  return (
    <div>
      { children }
      <CartSidebar
        isCartSidebar={
          router?.route === "/cart" ? false : true
        }
      />
    </div>
  )
}

export default Layout;