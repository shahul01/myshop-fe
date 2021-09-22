import Cart from "./Cart/Cart";

const Layout = ({ children }) => {
  return (
    <div>
      { children }
      <Cart />
    </div>
  )
}

export default Layout;