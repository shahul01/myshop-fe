import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { REMOVE_PRODUCT } from '../reducers/cartReducer';
import { deleteCart } from './api';
import styles from "./Cart.module.css";

const Cart = () => {

  const { carts, dispatch } = useContext(CartContext);

  async function handleDelete(id) {
    // COMMT: made this a promise so it deletes from cart only if there is no error in fetch delete.
    new Promise((res, req) => {

      res(deleteCart(id));
    }).then((res) => {
      dispatch({type: REMOVE_PRODUCT, id:res.id});
    });

  }

  const cartList = carts?.map(currCart => (
    <div key={currCart.key} className={styles['cart-product']} title={currCart.title} >

      <span
        onClick={() => handleDelete(currCart.id)}
        >
        X
      </span>
      <img
        src={currCart.imgSrc}
        alt={currCart.title}
        className={styles['img']}
      />
    </div>
  ));

  return (
    <div className={styles['cart-container']}>
      <h2>Cart</h2>
      <hr className='short-hr' />

      <div className={styles['image-container']}>
        {cartList}
      </div>

    </div>
  )
}

export default Cart;