import { useContext } from 'react';
import styles from "./Cart.module.css";
import { CartContext } from './contexts/CartContext';

const Cart = () => {

  const { carts } = useContext(CartContext);
  console.log(`carts redux`, carts);

  const cartList = carts?.map(currCart => (
    // console.log(`currCart `, currCart)
    <div key={currCart.productId}>
      <img src={currCart.imgSrc} alt='' />
    </div>
  ));

  return (
    <div className={styles.cartContainer}>
      <h2>Cart: </h2>
      <div className={styles.imageContainer}>
        {/* <img src="https://images-na.ssl-images-amazon.com/images/I/815g8Uo656S._AC_UL200_SR200,200_.jpg" alt="" className={styles.img}/>
        <img src="https://images-na.ssl-images-amazon.com/images/I/815g8Uo656S._AC_UL200_SR200,200_.jpg" alt="" className={styles.img}/> */}

        {cartList}
      </div>
    </div>
  )
}

export default Cart;