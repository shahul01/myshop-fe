import SearchContextProvider from 'helpers/Contexts/SearchContext';
import UserContextProvider from 'helpers/Contexts/UserContext';
import CartContextProvider from 'helpers/Contexts/CartContext';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SearchContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />

          </Layout>
        </CartContextProvider>
      </UserContextProvider>
    </SearchContextProvider>
  )
}

export default MyApp;
