import UserContextProvider from '../Helpers/Contexts/UserContext';
import CartContextProvider from '../Helpers/Contexts/CartContext';
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
