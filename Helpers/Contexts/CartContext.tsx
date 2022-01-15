import { createContext, useReducer, useState, useEffect } from "react";
import cartReducer, { ADD_TO_CART } from "../Reducers/cartReducer";
import useFetch from "../Hooks/useFetch";
// import { ICart } from "../../global";



export const CartContext = createContext<ICart[] | null>(null);

const CartContextProvider = (props) => {
  let { data: cartFetch, error, isPending } = useFetch('http://localhost:1337/carts/', 'GET', null);

  const [ cart, dispatch ] = useReducer(cartReducer, []);
  // COMMT: Intialise reducer w/ cart data.
  useEffect( async () => {
    if (cartFetch) {
      cart = [];
      // COMMT: w/ HMReload, same data is added unnecessarily

      cartFetch.forEach(currCart => {
        // console.log(`currCart`, currCart)

        dispatch({ type: ADD_TO_CART, cart: {
          id: currCart?.id,
          productId: currCart?.productId,
          title: currCart?.title,
          imgSrc: currCart?.images?.[0],
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
