import UserContextProvider from '../helpers/Contexts/UserContext';
import CartContextProvider from '../helpers/Contexts/CartContext';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />

        </Layout>
      </CartContextProvider>
    </UserContextProvider>
  )
}

export default MyApp;
