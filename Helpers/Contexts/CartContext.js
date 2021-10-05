import { createContext, useReducer, useState, useEffect } from 'react';
import cartReducer, { ADD_TO_CART } from "../Reducers/cartReducer";
import useFetch from '../Hooks/useFetch';

export const CartContext = createContext();
// export let [isRefresh, setIsRefresh] = useState(false);

const CartContextProvider = (props) => {
  let { data: cartFetch, error, isPending } = useFetch('http://localhost:1337/carts/', 'get', null);
  const [ cartState, setCartState ] = useState([]);

  if (!cartState) return;
  const [ cart, dispatch ] = useReducer(cartReducer, [], () => {
    // console.log('cartState 2 :>> ', cartState);
    return cartState;
  });

  useEffect( async () => {
    if (cartFetch) {
      // console.log('runs');
      // console.log('isRefresh :>> ', isRefresh);

      // await new Promise ((res, rej) => {
      //   () => res(cartFetch)
      // }).then((res) => {

      //   setCartState(res);
      //   console.log(`cartFetch`, cartFetch)
      //   console.log('cartState :>> ', cartState);
      // })

      // COMMT: w/ HMReload, same data is added unnecessarily

      cartFetch.forEach(currCart => {
        // console.log(`currCart`, currCart)

        dispatch({ type: ADD_TO_CART, cart: {
          id: currCart?.id,
          productId: currCart?.productId,
          title: currCart?.title,
          imgSrc: currCart?.imgSrc,
          price: currCart?.price
        } });

      })

      // console.log('cart :>> ', cart);

    }
  }, [cartFetch]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;
