import React, { createContext, useReducer, useState, useEffect } from 'react';
import { cartReducer } from "../reducers/cartReducer";
import useFetch from '../useFetch';

export const CartContext = createContext();

// https://www.c-sharpcorner.com/article/usereducer-hook-in-reactjs-part-three/

const CartContextProvider = (props) => {
  const { data: cartFetch, error, isPending } = useFetch('http://localhost:1337/carts/')
  const [ cartState, setCartState ] = useState([]);
  // console.log('cartFetch :>> ', cartFetch);
  console.log('cartState 3 :>> ', cartState);
  console.log('cartReducer :>> ', cartReducer);

  // if (cartState) {
    const [ carts, dispatch ] = useReducer(cartReducer, [], () => {
      console.log('cartState 2 :>> ', cartState);
      return cartState ? cartState : [];
      // return cartState ? JSON.parse(cartState) : [];
      // return cartState ? console.log('cartState :>> ', cartState) : [];

      // const localCart =  localStorage.getItem('myshopCart');
      // return localCart ? JSON.parse(localCart) : [];
    })
  // }
  console.log('carts :>> ', carts);
  useEffect(() => {
    if (cartFetch) setCartState(cartFetch);
    // dispatch({ type: 'ADD_TO_CART', cart: [{ productId: cartState?.productId }]})
    // console.log('cartFetch :>> ', cartFetch);
    // localStorage.setItem('myshopCart', JSON.stringify(cartFetch));
    console.log('cartState 1 :>> ', cartState);
  }, [cartFetch]);




  return (
    <CartContext.Provider value={{ carts, dispatch }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;
