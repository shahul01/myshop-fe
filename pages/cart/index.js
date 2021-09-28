import useFetch from "../../Helpers/Hooks/useFetch";
import styles from "./cart.module.css";

const Cart = () => {

  const { data: cartData, isPending, error }= useFetch(`http://localhost:1337/carts`);

  let cartList = cartData?.map(currData => (
    <div className={styles['cart']} key={currData.id}>
      <img className={styles['img']} src={currData.imgSrc} alt={currData.title} />
      <div className={styles['cart-detail']}>
        <h1 className={styles['title']}>{currData.title}</h1>
        <h4 className={styles['price']}>{currData.price}</h4>
      </div>

    </div>

  ));

  function handleCheckout() {
    console.log('click');
  };

  return (
    <div >
      {!error && !isPending && cartList}

      <button
        className={`basic-material-btn ${styles['checkout-btn']}`}
        onClick={() => handleCheckout()}
        >
        Checkout
      </button>

    </div>
  )

};

export default Cart