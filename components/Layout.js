import Cart from "./Cart";

const Layout = ({ children }) => {
  return (
    <div>
      { children }
      <Cart />
    </div>
  )
}

export default Layout;