import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { deleteCart } from './api';
import styles from "./Cart.module.css";

const Cart = () => {

  const { carts } = useContext(CartContext);
  // console.log(`carts context`, carts);

  function handleDelete(id) {
    // console.log('id :>> ', id);
    deleteCart(id);
    // refreshCart();
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