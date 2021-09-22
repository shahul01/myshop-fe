import { createContext, useReducer, useState, useEffect } from 'react';
import cartReducer from "../reducers/cartReducer";
import useFetch from '../useFetch';

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const { data: cartFetch, error, isPending } = useFetch('http://localhost:1337/carts/')
  const [ cartState, setCartState ] = useState([]);

  if (!cartState) return;
  const [ carts, dispatch ] = useReducer(cartReducer, [], () => {
    // console.log('cartState 2 :>> ', cartState);
    return cartState;
  });

  useEffect( async () => {
    if (cartFetch) {

      // await setCartState(cartFetch);
      // await setTimeout(() => {
      //   setCartState(cartFetch)
      //   console.log(`cartState 99`, cartState);
      // }, 4000);
      // console.log(`cartFetch 99`, cartFetch);

      // COMMT: if refreshed same data is added unnecessarily
      cartFetch.forEach(currCart => {
        dispatch({ type: 'ADD_TO_CART', cart: {
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
