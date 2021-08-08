import styles from "./Cart.module.css";

const Cart = () => {
  return (
    <div className={styles.cartContainer}>
      <h2>Cart: </h2>
      <div className={styles.imageContainer}>
        {/* <img src="https://images-na.ssl-images-amazon.com/images/I/815g8Uo656S._AC_UL200_SR200,200_.jpg" alt="" className={styles.img}/>
        <img src="https://images-na.ssl-images-amazon.com/images/I/815g8Uo656S._AC_UL200_SR200,200_.jpg" alt="" className={styles.img}/> */}
      </div>
    </div>
  )
}

export default Cart;