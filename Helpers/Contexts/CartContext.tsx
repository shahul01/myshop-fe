import { createContext, useReducer, useState, useEffect } from "react";
import cartReducer, { ADD_TO_CART } from "helpers/Reducers/cartReducer";
import useFetch from "helpers/Hooks/useFetch";
// import { ICart } from "../../global";

export const CartContext = createContext<ICart[] | null>(null);

const CartContextProvider = (props) => {
  const [ cart, dispatch ] = useReducer(cartReducer, []);

  let { data: cartFetch, error, isPending } = useFetch('http://localhost:1337/carts/', 'GET', null);
  // COMMT: Intialise reducer w/ cart data.
  useEffect(  () => {
    if (cartFetch) {
      cart = [];
      // COMMT: w/ HMReload, same data is added unnecessarily

      cartFetch?.forEach((currCart:ICart) => {
        // console.log(`currCart`, currCart)

        dispatch({ type: ADD_TO_CART, cart: {
          id: currCart?.id,
          productId: currCart?.productId,
          title: currCart?.title,
          repeatItem: currCart?.repeatItem,
          imgSrc: currCart?.images?.[0],
          price: currCart?.price
        } as ICart });

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
