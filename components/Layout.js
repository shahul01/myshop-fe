import CartSidebar from "./CartSidebar/index";

const Layout = ({ children }) => {
  return (
    <div>
      { children }
      <CartSidebar />
    </div>
  )
}

export default Layout;