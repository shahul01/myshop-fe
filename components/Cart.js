import { useContext } from 'react';
import styles from "./Cart.module.css";
import { CartContext } from './contexts/CartContext';

const Cart = () => {

  const { carts } = useContext(CartContext);
  // console.log(`carts context`, carts);

  const cartList = carts?.map(currCart => (
    <div key={currCart.id} title={currCart.title}>
      <img
        src={currCart.imgSrc}
        alt={currCart.title}
        className={styles.img}
      />
    </div>
  ));

  return (
    <div className={styles.cartContainer}>
      <h2>Cart: </h2>
      <div className={styles.imageContainer}>
        {cartList ? cartList : ''}
      </div>
    </div>
  )
}

export default Cart;