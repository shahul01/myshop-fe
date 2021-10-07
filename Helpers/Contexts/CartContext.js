import { createContext, useReducer, useState, useEffect } from 'react';
import cartReducer, { ADD_TO_CART } from "../Reducers/cartReducer";
import useFetch from '../Hooks/useFetch';

export const CartContext = createContext();

const CartContextProvider = (props) => {
  let { data: cartFetch, error, isPending } = useFetch('http://localhost:1337/carts/', 'GET', null);

  const [ cart, dispatch ] = useReducer(cartReducer, []);

  // COMMT: Intialise reducer w/ cart data.
  useEffect( async () => {
    if (cartFetch) {
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

    }
  }, [cartFetch]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;
