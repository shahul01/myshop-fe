import { createContext, useReducer, useState, useEffect } from 'react';
import cartReducer, { ADD_TO_CART } from "../reducers/cartReducer";
import useFetch from '../useFetch';

export const CartContext = createContext();
// export let [isRefresh, setIsRefresh] = useState(false);

const CartContextProvider = (props) => {
  let { data: cartFetch, error, isPending } = useFetch('http://localhost:1337/carts/')
  const [ cartState, setCartState ] = useState([]);

  if (!cartState) return;
  const [ carts, dispatch ] = useReducer(cartReducer, [], () => {
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

      // console.log('carts :>> ', carts);

    }
  }, [cartFetch]);

  return (
    <CartContext.Provider value={{ carts, dispatch }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;
