import { useContext } from 'react';
import { CartContext } from './contexts/CartContext';
import styles from "./Cart.module.css";

const Cart = () => {

  const { carts } = useContext(CartContext);
  // console.log(`carts context`, carts);

  const cartList = carts?.map(currCart => (
    <div key={currCart.id} title={currCart.title}>
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
        {cartList ? cartList : ''}
      </div>
    </div>
  )
}

export default Cart;